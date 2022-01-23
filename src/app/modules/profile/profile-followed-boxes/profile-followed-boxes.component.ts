import { Component, OnInit, Input } from '@angular/core';
import { NotificationsQuery } from 'src/app/models/notifications/state/notifications.query';
import { NotificationsService } from 'src/app/models/notifications/state/notifications.service';
  
@Component({
    selector: 'osem-profile-followed-boxes',
    templateUrl: './profile-followed-boxes.component.html',
    styleUrls: ['./profile-followed-boxes.component.scss'],
})

export class ProfileFollowedBoxesComponent implements OnInit {
    
    @Input() notificationRules;
    
    constructor(private notificationsQuery: NotificationsQuery, private notificationsService: NotificationsService) { }
    dataSource: any [] = [];
    editField: string;
    
    updateValue(i:number, id:string, boxSensors: any, boxBox:string , boxName: string, boxActivationTrigger:string, boxActive: boolean, boxUser: string , boxNotCha:any, event: any) {
      let e = (document.getElementById('sel-operators'+i)) as HTMLSelectElement;
      let operators = e.options[e.selectedIndex].text;
      let thresholds = document.getElementById('form-thresholds'+i);
      let f = document.getElementById("check-email"); //TODO: Getting notification by email option
      console.log(thresholds);
      this.notificationsService.updateNotificationRule({
        notificationRuleId:id,
        sensors:boxSensors,
        box:boxBox,
        name:boxName,
        // @ts-ignore
        activationThreshold: thresholds.value,
        activationOperator: operators,
        activationTrigger:boxActivationTrigger,
        active:boxActive,
        user:boxUser,
        notificationChannel:boxNotCha,
      })
    }
    
    remove(i:number, id:string) {
      this.notificationsService.deleteNotificationRule(id);
    }

    async ngOnInit() {
    }

    ngOnChanges(changes) {
        if(changes.notificationRules && typeof changes.notificationRules.currentValue != "undefined") {
            this.dataSource = changes.notificationRules.currentValue;
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    ngAfterViewInit(): void {
        // afterViewInit code.
        this.init();
    }

    init(): void {
        // init code.
    }
}