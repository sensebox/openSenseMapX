import { Component, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/models/session/state/session.query';
import { NotificationsQuery } from 'src/app/models/notifications/state/notifications.query';
import { NotificationsService } from 'src/app/models/notifications/state/notifications.service';

@Component({
  selector: 'osem-notifications-container',
  templateUrl: './notifications-container.component.html',
  styleUrls: ['./notifications-container.component.scss']
})
export class NotificationsContainerComponent implements OnInit {

  loggedIn$ = this.sessionQuery.isLoggedIn$;

  notifications$ = this.notificationsQuery.notifications$;
  areNotificationsLoaded$ = this.notificationsQuery.areNotificationsLoaded$;

  constructor(private notificationsQuery: NotificationsQuery, private notificationsService: NotificationsService, private sessionQuery: SessionQuery) { }

  ngOnInit() {
    this.notificationsService.getNotificationRules();
  }

}
