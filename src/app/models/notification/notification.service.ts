import { Injectable } from "@angular/core";
import { Notification } from "./notification.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { SessionQuery } from "../session/state/session.query";
import { environment } from "src/environments/environment";
import { ToasterService } from "angular2-toaster";

@Injectable({ providedIn: "root" })
export class NotificationService {
  constructor(private sessionQuery: SessionQuery, private http: HttpClient, private toasterService: ToasterService) {
    if(this.sessionQuery.isLoggedIn()) {
      this.fetch();
    }
  }

  notifications: BehaviorSubject<Notification[]> = new BehaviorSubject<
    Notification[]
  >([]);

  add(notification: Notification) {
    this.notifications.next(this.notifications.getValue().concat(notification));
    this.toasterService.pop("success", "", "New Notification");
  }

  remove(notification: Notification) {
    this.notifications.next(
      this.notifications.getValue().filter((n) => n !== notification)
    );
    this.setAsRead(notification._id);
  }

  get() {
    return this.notifications.getValue();
  }

  setAsRead(notificationId) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("sb_accesstoken")
    );

    this.http
      .get(environment.api_url + "/notifications/setAsRead/" + notificationId, {
        headers: headers,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetch() {
    let headers = new HttpHeaders();
    headers = headers.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("sb_accesstoken")
    );

    this.http
      .get(environment.api_url + "/notifications/getUnread", {
        headers: headers,
      })
      .subscribe((notifications: Notification[]) => {
        for (let notification of notifications) {
          this.add(notification);
        }
      });
  }
}
