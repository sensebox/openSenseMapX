import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationsQuery } from 'src/app/models/notifications/state/notifications.query';
import { NotificationsService } from 'src/app/models/notifications/state/notifications.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'osem-notifications-viewer',
  templateUrl: './notifications-viewer.component.html',
  styleUrls: ['./notifications-viewer.component.scss']
})
export class NotificationsViewerComponent implements OnInit {

  @Input() notifications;
  @Input() areNotificationsLoaded;
  @Input() user;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private notificationsService: NotificationsService, private notificationsQuery: NotificationsQuery) { }

  ngOnInit() {
  }

  async ngOnChanges(changes) {
    if(changes.user && typeof changes.user.currentValue != "undefined" && changes.user.currentValue != null) {
      this.notificationsService.getNotificationRules();
    }
  }
  
  boxDetails(id) {
    this.router.navigate(['/explore/' + id], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge'
    }); 
  }

}
