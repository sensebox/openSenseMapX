import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { GridComponent, GridColumn, DataAdapter, Smart } from '@smart-webcomponents-angular/grid';
import { GetData } from './../../../../assets/data/data';
import { NotificationsQuery } from 'src/app/models/notifications/state/notifications.query';
import { NotificationsService } from 'src/app/models/notifications/state/notifications.service';
  
@Component({
    selector: 'osem-profile-followed-boxes-container',
    templateUrl: './profile-followed-boxes-container.component.html',
    styleUrls: ['./profile-followed-boxes-container.component.scss'],
})

export class ProfileFollowedBoxesContainerComponent implements AfterViewInit, OnInit {
    
    notificationRules$ = this.notificationsQuery.notificationRules$;

    constructor(private notificationsQuery: NotificationsQuery, private notificationsService: NotificationsService) { }

    ngOnInit() {
        this.notificationsService.getNotificationRules();
    }

    ngAfterViewInit(): void {
        // afterViewInit code.
        this.init();
    }

    init(): void {
        this.notificationsService.getNotificationRules();
    }
}