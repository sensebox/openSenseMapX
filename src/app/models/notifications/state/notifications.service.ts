import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import * as moment from 'moment';
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
          let sensors = [];
          for ( let i = 0; i < notificationRule.sensors.length; i++) {
            // @ts-ignore
            sensors.push(box.sensors.find(sensor => sensor._id == notificationRule.sensors[i]))
          }
          notification = {
            ...notification,
            timeText: moment(notification.notificationTime).format("DD.MM.YYYY, HH:mm"),
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

  setNewNotification(newNotification) {
    this.notificationsStore.update(state => ({
      ...state,
      newNotification: newNotification
    }))
  }

  getBox(id, headers){
    return new Promise ((resolve, reject) => {
      this.http.get(this.AUTH_API_URL + '/boxes/' + id, {headers: headers}).subscribe((res:any) => {
        resolve(res)
      });
    })
  }
}
