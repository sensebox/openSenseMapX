import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { NotificationsStore } from './notifications.store';
import { NotificationsQuery } from './notifications.query';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class NotificationsService {

  AUTH_API_URL = environment.api_url;

  constructor(
    private notificationsStore: NotificationsStore, 
    private notificationsQuery: NotificationsQuery, 
    private router: Router,
    private http: HttpClient) {

  }

  async getNotificationRules(){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+window.localStorage.getItem('sb_accesstoken'));

    this.http.get(this.AUTH_API_URL + '/notification/notificationRule', {headers: headers}).subscribe(async (res:any) => {
      this.notificationsStore.set({});
      let notifications = [];
      for (let i = 0; i < res.data.length; i++) {
        let notificationRule = res.data[i];
        let box = await this.getBox(notificationRule.box, headers);
        for (let j = 0; j < notificationRule.notifications.length; j++) {
          let notification = notificationRule.notifications[j];
          let notiTime = notification.notificationTime
          let sensors = [];
          for ( let i = 0; i < notificationRule.sensors.length; i++) {
            // @ts-ignore
            sensors.push(box.sensors.find(sensor => sensor._id == notificationRule.sensors[i]))
          }
          notification = {
            ...notification,
            timeText: notiTime.slice(8, 10) + "." + notiTime.slice(5, 7) + "." + notiTime.slice(2, 4) + ", " + notiTime.slice(11, 16),
            type: "threshold",
            activationOperator: notificationRule.activationOperator,
            activationThreshold: notificationRule.activationThreshold,
            ruleName: notificationRule.name,
            box: box,
            // @ts-ignore
            sensors: sensors
          }
          notifications.push(notification)
        }
        res.data[i] = {
          ...notificationRule,
          // @ts-ignore
          boxName: box.name,
          // @ts-ignore
          boxExposure: box.exposure,
          // @ts-ignore //TODO: a notificationRule could theoretically have more than one sensor, but Im not sure if we care about that...
          sensorName: box.sensors.find(sensor => sensor._id == notificationRule.sensors[0]).title,
          // @ts-ignore
          boxDate: box.updatedAt,
        }
      }
      notifications.sort((a,b) => b.notificationTime.localeCompare(a.notificationTime));
      this.notificationsStore.update(state => ({
        ...state,
        notifications: notifications,
        notificationRules: res.data,
        areNotificationsLoaded: true
      }));
      this.initializeWebsocket(res.data)
    });
  }

  createNotificationRule(params, boxName, sensorTitle) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+window.localStorage.getItem('sb_accesstoken'));
    this.http.post(`${environment.api_url}/notification/notificationRule`, params, {headers: headers}).subscribe((res:any) => {
      var d = new Date();
      let newNotification = {
        type: "notification-rule",
        boxName: boxName,
        boxId: params.box,
        sensorTitle: sensorTitle,
        timeText: d.getDate() + "." + (d.getMonth()+1) + "." + (String(d.getFullYear()).slice(2,4)) + ", " + d.getHours() + ":" + d.getMinutes()
      };
      this.notificationsStore.update(state => ({
        ...state,
        notifications: (typeof state.notifications != "undefined") ? [newNotification].concat(state.notifications) : [newNotification]
      }));
      this.setNewNotification(newNotification)
    });
  }

  // this will be shown in the popup
  setNewNotification(newNotification) {
    this.notificationsStore.update(state => ({
      ...state,
      newNotification: newNotification
    }))
  }

  getBox(id, headers){
    // TODO: this should not be requested from the backend again. Maybe it is already saved in another model in the frontend
    return new Promise ((resolve, reject) => {
      this.http.get(this.AUTH_API_URL + '/boxes/' + id, {headers: headers}).subscribe((res:any) => {
        resolve(res)
      });
    })
  }

  initializeWebsocket(notificationRules) {
    // alternatively get rules from: this.notificationsQuery.notificationRules$

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+window.localStorage.getItem('sb_accesstoken'));

    console.log('connecting')
    let ws = new WebSocket('ws://localhost:12345/')
    ws.onopen = (evt) => {
      console.log('connection opened')

      var testrules = [ 
          '61c4cf161885f45a708bbd4a' 
      ]

      console.log('subscribed to', testrules)
      ws.send('subscribe:'+testrules.join(':'))
    }
    ws.onmessage = async (evt) => {
      // console.log(evt.data)
      const message = JSON.parse(evt.data)
      let box = await this.getBox(message.rule.box, headers);
      let sensors = [];
        for ( let i = 0; i < message.rule.sensors.length; i++) {
          // @ts-ignore
          sensors.push(box.sensors.find(sensor => sensor._id == message.rule.sensors[i]))
        }
      let notification = {
        notificationRule: message.rule._id,
        notificationValue: message.measurement.value,
        notificationTime: message.createdAt,
        timeText: message.createdAt.slice(8, 10) + "." + message.createdAt.slice(5, 7) + "." + message.createdAt.slice(2, 4) + ", " + message.createdAt.slice(11, 16),
        type: "threshold",
        activationOperator: message.rule.activationOperator,
        activationThreshold: message.rule.activationThreshold,
        ruleName: message.rule.name,
        box: box,
        // @ts-ignore
        sensors: sensors
      }
      this.notificationsStore.update(state => ({
        ...state,
        notifications: (typeof state.notifications != "undefined") ? [notification].concat(state.notifications) : [notification]
      }));
    }
    ws.onerror = (evt) => console.error('onerror', evt)
    ws.onclose = (evt) => setTimeout(
      () => {
          console.warn('onclose', evt)
      }, 1000)
  }
}
