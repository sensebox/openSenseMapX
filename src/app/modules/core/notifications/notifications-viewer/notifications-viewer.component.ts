import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationsQuery } from 'src/app/models/notifications/state/notifications.query';
import { NotificationsService } from 'src/app/models/notifications/state/notifications.service';

@Component({
  selector: 'osem-notifications-viewer',
  templateUrl: './notifications-viewer.component.html',
  styleUrls: ['./notifications-viewer.component.scss']
})
export class NotificationsViewerComponent implements OnInit {

  @Input() notifications;
  @Input() areNotificationsLoaded;

  constructor(private notificationsService: NotificationsService, private notificationsQuery: NotificationsQuery) { }

  async ngOnInit() {
  }

}
