import { Injectable, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ID } from '@datorama/akita';
import * as moment from 'moment';
import { NotificationsStore } from './notifications.store';
import { NotificationsQuery } from './notifications.query';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NotificationsService {

  AUTH_API_URL = environment.api_url;

  public postError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
  public messageToUser: string;
  
  websocket;

  constructor(
    private notificationsStore: NotificationsStore,
    private notificationsQuery: NotificationsQuery,
    private router: Router,
    private http: HttpClient
    ) { }

  async getRulesAndConnectors(){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+window.localStorage.getItem('sb_accesstoken'));

    this.http.get(this.AUTH_API_URL + '/notification/notificationRule', {headers: headers}).subscribe(async (res:any) => {
      let notificationRules = res.data;
      this.notificationsStore.set({});
      let notifications = [];
      for (let i = 0; i < notificationRules.length; i++) {
        try {
          let notificationRule = notificationRules[i];
          let box = await this.getBox(notificationRule.box, headers);
          let sensors = [];
          for ( let i = 0; i < notificationRule.sensors.length; i++) {
            // @ts-ignore
            sensors.push(box.sensors.find(sensor => sensor._id == notificationRule.sensors[i]))
          }
          for (let j = 0; j < notificationRule.notifications.length; j++) {
            let notification = notificationRule.notifications[j];
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
          notificationRules[i] = {
            ...notificationRule,
            boxWhole:box,
            // @ts-ignore // TODO: redundant
            boxName: box.name,
            // @ts-ignore
            boxExposure: box.exposure,
            // @ts-ignore //TODO: a notificationRule could theoretically have more than one sensor, but Im not sure if we care about that...
            sensorName: sensors[0].title,
            sensorWhole: sensors[0],
            // @ts-ignore
            boxDate: box.updatedAt,
          }
        } catch(e) {
          console.error(e);
          notificationRules.splice(i, 1);
          i--;
        }
      }
      notifications.sort((a,b) => b.notificationTime.localeCompare(a.notificationTime));
      this.notificationsStore.update(state => ({
        ...state,
        notifications: notifications,
        notificationRules: notificationRules,
        areNotificationsLoaded: true
      }));

      // get all teh connectors and their notifications and add them to the store
      this.http.get(this.AUTH_API_URL + '/notification/notificationRule/connects', {headers: headers}).subscribe(async (res:any) => {

        let notifications = [];
        for (let i = 0; i < res.data.length; i++) {
          try {
            let notificationConnector = res.data[i];
            let ruleA = notificationRules.find(rule => rule._id == notificationConnector.ruleA)
            let ruleB = notificationRules.find(rule => rule._id == notificationConnector.ruleB)
            for (let j = 0; j < notificationConnector.notifications.length; j++) {
              let notification = notificationConnector.notifications[j];
              notification = {
                ...notification,
                timeText: moment(notification.notificationTime).format("DD.MM.YYYY, HH:mm"),
                type: "threshold",
                connectionOperator: notificationConnector.connectionOperator,
                ruleName: notificationConnector.name,
                box: ruleA.boxWhole,
                sensors: [ruleA.sensorWhole]
              }
              notifications.push(notification)
            }
          } catch(e) {
            console.error(e);
            res.data.splice(i, 1);
            i--;
          }
        }
        notifications.sort((a,b) => b.notificationTime.localeCompare(a.notificationTime));
        this.notificationsStore.update(state => ({
          ...state,
          notifications: notifications.concat(state.notifications),
          notificationConnectors: res.data,
          areNotificationsLoaded: true
        }));
        // after everything loaded initialize the websocket
        this.initializeWebsocket()
      });
    });
  }

  async createNotificationRule(params, boxName, sensorTitle) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+window.localStorage.getItem('sb_accesstoken'));
    this.http.post(`${environment.api_url}/notification/notificationRule`, params, {headers: headers})
      .pipe(catchError(err => {
        this.messageToUser = "Rule already exists.";
        throw 'An error occurred: ' + err;
      }))
      .subscribe(async (res:any) => {
      this.messageToUser = "ok"; 
      var d = new Date();
      // give a notification that a rule was created
      let newNotification = {
        type: "notification-rule",
        boxName: boxName,
        boxId: params.box,
        sensorTitle: sensorTitle,
        timeText: d.getDate() + "." + (d.getMonth()+1) + "." + (String(d.getFullYear()).slice(2,4)) + ", " + d.getHours() + ":" + d.getMinutes()
      };
      this.setNewNotification(newNotification);
      // update the notification rules
      let box = await this.getBox(res.data.box, headers);
      res.data = {
        ...res.data,
        // @ts-ignore
        boxName: box.name,
        // @ts-ignore
        boxExposure: box.exposure,
        // @ts-ignore //TODO: a notificationRule could theoretically have more than one sensor, but Im not sure if we care about that...
        sensorName: box.sensors.find(sensor => sensor._id == res.data.sensors[0]).title,
        // @ts-ignore
        boxDate: box.updatedAt,
      }
      this.notificationsStore.update(state => ({
        ...state,
        notifications: (typeof state.notifications != "undefined") ? [newNotification].concat(state.notifications) : [newNotification],
        notificationRules: [res.data].concat(state.notificationRules)
      }));

      // websocket
      if (this.websocket) {
        this.websocket.send('subscribe:'+res.data._id)
      }
    });
  }

  updateNotificationRule(params) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+window.localStorage.getItem('sb_accesstoken'));
    this.http.put(`${environment.api_url}/notification/notificationRule/`+params.notificationRuleId, params, {headers: headers}).subscribe((res:any) => {
      //@ts-ignore
      let currentRules = this.notificationsStore.store._value.state.notificationRules;
      let indexOfChanged = currentRules.findIndex(x => x._id === res.data._id);
      if (indexOfChanged >= 0) currentRules[indexOfChanged] = res.data;
      this.notificationsStore.update(state => ({
        ...state,
        notificationRules: currentRules
      }));
    });
  }

  deleteNotificationRule(notificationRuleId) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+window.localStorage.getItem('sb_accesstoken'));
    this.http.delete(`${environment.api_url}/notification/notificationRule/`+notificationRuleId, {headers: headers}).subscribe((res:any) => {
      //@ts-ignore
      let currentRules = this.notificationsStore.store._value.state.notificationRules;
      let indexOfDeleted = currentRules.findIndex(x => x._id === res.data._id);
      if (indexOfDeleted >= 0) currentRules.splice(indexOfDeleted, 1);;
      this.notificationsStore.update(state => ({
        ...state,
        notificationRules: currentRules
      }));
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
      },
      (err:any) => {
        reject(err)
      });
    })
  }

  initializeWebsocket() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+window.localStorage.getItem('sb_accesstoken'));

    let connectws = () => {
      // TODO: websocket should be a variable of this class. Everytime this message is called it should only update the subscriptions and not create a new websocket
      // TODO: The url of the websocket should go into the configuration file
      this.websocket = new WebSocket('ws://localhost:12345/')
      this.websocket.onopen = (evt) => {

        //@ts-ignore
        this.notificationsStore.store._value.state.notificationRules.forEach((rule) => {
          this.websocket.send('subscribe:'+rule._id)
        })

        //@ts-ignore
        this.notificationsStore.store._value.state.notificationConnectors.forEach((connector) => {
          this.websocket.send('subscribe:'+connector._id)
        })

      }
      this.websocket.onmessage = async (evt) => {
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
          timeText: moment(message.createdAt).format("DD.MM.YYYY, HH:mm"),
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
          unread: true,
          notifications: (typeof state.notifications != "undefined") ? [notification].concat(state.notifications) : [notification]
        }));
      }
      this.websocket.onerror = (evt) => console.error('onerror', evt)
      this.websocket.onclose = (evt) => setTimeout(
        () => {
            console.warn('onclose', evt);
            connectws();
        }, 3000)
    }
    connectws();
  }

  unreadFalse() {
    this.notificationsStore.update(state => ({
      ...state,
      unread: false
    }));
  }
}
