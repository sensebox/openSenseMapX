import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationsQuery } from 'src/app/models/notifications/state/notifications.query';
import { NotificationsService } from 'src/app/models/notifications/state/notifications.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'osem-notifications-popup',
  templateUrl: './notifications-popup.component.html',
  styleUrls: ['./notifications-popup.component.scss']
})
export class NotificationsPopupComponent implements OnInit {

  @Input() notifications;
  @Input() areNotificationsLoaded;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private notificationsService: NotificationsService, private notificationsQuery: NotificationsQuery) { }

  async ngOnInit() {
    await this.sleep(3000);
    document.getElementById("notification-popup").classList.add("active");
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
