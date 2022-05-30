import { Injectable } from "@angular/core";
import { io } from "socket.io-client";
import { environment } from "src/environments/environment";

import { SessionQuery } from "../models/session/state/session.query";

import { Notification } from "../models/notification/notification.model";
import { NotificationService } from "./notification.service";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  socket: any;
  room = "testRoom";
  user$;

  constructor(
    private sessionQuery: SessionQuery,
    private notificationService: NotificationService
  ) {
    if (this.sessionQuery.user$) {
      this.socket = io(environment.websocket_url);
      this.sessionQuery.user$.subscribe((user) => {
        this.user$ = user;
      });
    }

    this.socket.on("connect", () => {
      console.log("connected");
      this.socket.emit("join room", this.user$.email);
    });

    // SOMEHOW CALL NOTIFICATION FUNCTION FROM HERE
    this.socket.on("private message", (data) => {
      var notification = new Notification(
        data.message,
        data.user,
        data.room,
        data.date,
        data.id
      );
      this.notificationService.addNotification(notification);
    });
  }
}
