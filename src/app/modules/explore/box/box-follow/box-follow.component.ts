import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/models/notifications/state/notifications.service';
import { ActivatedRoute } from '@angular/router';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { BoxService } from 'src/app/models/box/state/box.service';

@Component({
  selector: 'osem-box-follow',
  templateUrl: './box-follow.component.html',
  styleUrls: ['./box-follow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxFollowComponent implements OnInit {

  @Input() activeBox;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private boxService: BoxService,
    private boxQuery: BoxQuery,
    private notificationsService: NotificationsService) { }
  
  ngOnInit() {
  }

  sendNotification() {
    // get input elements of the form
    let sensors = document.getElementById("form-sensors");
    let operators = document.getElementById("form-operators");
    let thresholds = document.getElementById("form-thresholds");
    // check if the input elements have been found
    // TODO: check if input elements have values!
    if (sensors && operators && thresholds) {
      // create a notification rule
      this.notificationsService.createNotificationRule({
        // @ts-ignore
        sensor: sensors.value,
        box: this.activeBox._id,
        name: "aRule",
        // @ts-ignore
        activationThreshold: thresholds.value,
        // @ts-ignore
        activationOperator: operators.value,
        activationTrigger: "any",
        active: true,
        user: "testuser",
        notificationChannel: [{ "channel": "email", "email": "test@test.invalid" }]
        // @ts-ignore
      }, this.activeBox.name, sensors.textContent)
    }
    // TODO: what happens after a notification rule has bee created? Will the form close? Do you get some message that it worked?
  }

}
