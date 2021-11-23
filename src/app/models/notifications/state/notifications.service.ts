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

  getNotificationRules(){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+window.localStorage.getItem('sb_accesstoken'));

    this.http.get(this.AUTH_API_URL + '/notification/notificationRule', {headers: headers}).subscribe((res:any) => {
      this.notificationsStore.set({});
      let notifications = [];
      for (let i = 0; i < res.data.length; i++) {
        let notificationRule = res.data[i];
        for (let j = 0; j < notificationRule.notifications.length; j++) {
          let notification = notificationRule.notifications[i];
          notification = {
            ...notification,
            activationOperator: notificationRule.activationOperator,
            activationThreshold: notificationRule.activationThreshold,
            ruleName: notificationRule.name,
            box: notificationRule.box,
            sensor: notificationRule.sensor
          }
          notifications.push(notification)
        }
      }
      this.notificationsStore.update(state => ({
        ...state,
        notifications: notifications,
        areNotificationsLoaded: true
      }));
      console.log(res.data)
    });
  }

}
