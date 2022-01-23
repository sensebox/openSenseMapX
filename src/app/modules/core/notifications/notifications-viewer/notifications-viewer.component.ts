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
  @Input() unread;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private notificationsService: NotificationsService, private notificationsQuery: NotificationsQuery) { }

  ngOnInit() {
  }
  
  boxDetails(id) {
    this.router.navigate(['/explore/' + id], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge'
    }); 
  }

  async ngAfterViewInit() {
    await this.sleep(200)
    this.notificationsService.unreadFalse()
  }

  async ngOnChanges(changes) {
    if(changes.unread && typeof changes.unread.currentValue != "undefined" && changes.unread.currentValue != null) {
      await this.sleep(200)
      this.notificationsService.unreadFalse()
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
