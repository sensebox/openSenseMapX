import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

import { Notification } from "../models/notification/notification.model";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  notifications = new BehaviorSubject<Notification[]>([]);

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

  constructor() {
  }
}
