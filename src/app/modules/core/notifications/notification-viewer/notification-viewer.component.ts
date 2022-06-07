import { Component, OnInit } from "@angular/core";
import { NotificationService } from "src/app/models/notification/notification.service";

@Component({
  selector: "osem-notification-viewer",
  templateUrl: "./notification-viewer.component.html",
  styleUrls: ["./notification-viewer.component.scss"],
})
export class NotificationViewerComponent implements OnInit {
  notifications = this.notificationService.notifications;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {}
}
