import { Component, Input, OnInit } from "@angular/core";
import { Notification } from "src/app/models/notification/notification.model";
import { NotificationService } from "src/app/services/notification.service";

import { NavRightComponent } from "../../nav/nav-right/nav-right.component";

@Component({
  selector: "osem-notification-popup",
  templateUrl: "./notification-popup.component.html",
  styleUrls: ["./notification-popup.component.scss"],
})
export class NotificationPopupComponent implements OnInit {
  @Input() public notification: Notification;

  constructor(
    private notificationService: NotificationService,
    private navRightComponent: NavRightComponent
  ) {}

  remove_me(notification) {
    this.notificationService.removeNotification(notification);
    if (this.notificationService.getNotifications().length === 0) {
      this.navRightComponent.notificationsToggled.emit(false);
    }
  }

  ngOnInit() {}
}
