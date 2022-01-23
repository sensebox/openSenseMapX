import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { NotificationsQuery } from 'src/app/models/notifications/state/notifications.query';
import { NotificationsService } from 'src/app/models/notifications/state/notifications.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'osem-notifications-popup',
  templateUrl: './notifications-popup.component.html',
  styleUrls: ['./notifications-popup.component.scss']
})
export class NotificationsPopupComponent implements OnInit {

  @Input() newNotification;
  hasNotification = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private notificationsService: NotificationsService, private notificationsQuery: NotificationsQuery) { }

  ngOnInit() {
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async ngOnChanges(changes) {
    if(changes.newNotification && typeof changes.newNotification.currentValue != "undefined" && changes.newNotification.currentValue != null) {
      document.getElementById("notification-popup").classList.remove("active");
      this.hasNotification = true;
      await this.sleep(200)
      document.getElementById("notification-popup").classList.add("active");
    }
  }
  
  boxDetails(id) {
    this.router.navigate(['/explore/' + id], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge'
    }); 
  }

  removeNotificationPopup() {
    document.getElementById("notification-popup").classList.toggle("active");
  }

}
