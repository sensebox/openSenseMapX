import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../../../services/notification.service";

@Component({
  selector: "osem-notification-viewer",
  templateUrl: "./notification-viewer.component.html",
  styleUrls: ["./notification-viewer.component.scss"],
})
export class NotificationViewerComponent implements OnInit {
  notifications = [];
  notification = this.notifications.length;

  constructor(private notificationService: NotificationService) {
    this.notificationService.notifications.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  ngOnInit() {}
}
