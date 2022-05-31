import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Notification } from "../models/notification/notification.model";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  notifications: BehaviorSubject<Notification[]> = new BehaviorSubject<
    Notification[]
  >([]);

  addNotification(notification: Notification) {
    this.notifications.next(this.notifications.getValue().concat(notification));
  }

  removeNotification(notification: Notification) {
    this.notifications.next(
      this.notifications.getValue().filter((n) => n !== notification)
    );
  }

  getNotifications() {
    return this.notifications.getValue();
  }

  fetchNotifications() {
    let headers = new HttpHeaders();
    headers = headers.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("sb_accesstoken")
    );

    this.http
      .get("http://localhost:8000/notifications/notifications", {
        headers: headers,
      })
      .subscribe((notifications: Notification[]) => {
        for (let notification of notifications) {
          console.log(notification);
          
          this.addNotification(notification);
        }
      });
  }

  constructor(private http: HttpClient) {
    this.fetchNotifications();
  }
}
