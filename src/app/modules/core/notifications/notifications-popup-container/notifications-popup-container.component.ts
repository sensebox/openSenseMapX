import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationsQuery } from 'src/app/models/notifications/state/notifications.query';
import { NotificationsService } from 'src/app/models/notifications/state/notifications.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'osem-notifications-popup-container',
  templateUrl: './notifications-popup-container.component.html',
  styleUrls: ['./notifications-popup-container.component.scss']
})
export class NotificationsPopupContainerComponent implements OnInit {

  newNotification$ = this.notificationsQuery.newNotification$;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private notificationsService: NotificationsService, private notificationsQuery: NotificationsQuery) { }

  ngOnInit() {
  }
  
  
  boxDetails(id) {
    this.router.navigate(['/explore/' + id], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge'
    }); 
  }

  removeNotificationPopup() {
    console.log("TODO: remove notification popup")
  }

}
