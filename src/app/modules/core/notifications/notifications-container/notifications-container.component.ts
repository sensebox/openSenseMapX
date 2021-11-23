import { Component, OnInit } from '@angular/core';
import { NotificationsQuery } from 'src/app/models/notifications/state/notifications.query';
import { NotificationsService } from 'src/app/models/notifications/state/notifications.service';

@Component({
  selector: 'osem-notifications-container',
  templateUrl: './notifications-container.component.html',
  styleUrls: ['./notifications-container.component.scss']
})
export class NotificationsContainerComponent implements OnInit {

  notifications$ = this.notificationsQuery.notifications$;
  areNotificationsLoaded$ = this.notificationsQuery.areNotificationsLoaded$;

  constructor(private notificationsQuery: NotificationsQuery, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.notificationsService.getNotificationRules();
  }

}
