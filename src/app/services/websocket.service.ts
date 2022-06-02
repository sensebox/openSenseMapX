import { Injectable } from "@angular/core";
import { io } from "socket.io-client";
import { environment } from "src/environments/environment";

import { SessionQuery } from "../models/session/state/session.query";
import { NotificationService } from "./notification.service";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  socket: any;
  user$;

  constructor(
    private sessionQuery: SessionQuery,
    private notificationService: NotificationService
  ) {
    if (this.sessionQuery.user$) {
      this.socket = io(environment.websocket_url, {
        auth: { auth_token: window.localStorage.getItem("sb_accesstoken") },
      });
      this.sessionQuery.user$.subscribe((user) => {
        this.user$ = user;
      });
    }

    this.socket.on("connect", () => {
      console.log("connected");
      this.socket.emit("join room", this.user$.email);
    });

    this.socket.on("notification:create", (notification) => {
      console.log(notification);
      this.notificationService.addNotification(notification);
    });
  }
}
