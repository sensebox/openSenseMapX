import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/models/notifications/state/notifications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { BoxService } from 'src/app/models/box/state/box.service';
import { SensorService } from 'src/app/models/sensor/state/sensor.service';

@Component({
  selector: 'osem-box-follow',
  templateUrl: './box-follow.component.html',
  styleUrls: ['./box-follow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxFollowComponent implements OnInit {

  @Input() activeBox;
  @Input() user;
  sensorUnit;
  textForm;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private boxService: BoxService,
    private boxQuery: BoxQuery,
    private notificationsService: NotificationsService,
    public router: Router) { }


  ngOnInit() {
  }

  sendNotification() {
    // get input elements of the form
    let sensors = document.getElementById("form-sensors");
    let operators = document.getElementById("form-operators");
    let thresholds = document.getElementById("form-thresholds");
    let email = document.getElementById("form-email");
    // check if the input elements have been found
    // TODO: check if input elements have values!
    if (sensors && operators && thresholds && email) {
      let notificationChannels = [];
      // @ts-ignore
      if(email.checked) {
        notificationChannels.push({
            "channel": "email", 
            "email": this.user.email
        })
      }
      // create a notification rule
      this.notificationsService.createNotificationRule({
        // @ts-ignore
        sensors: [sensors.value],
        box: this.activeBox._id,
        name: "aRule",
        // @ts-ignore
        activationThreshold: thresholds.value,
        // @ts-ignore
        activationOperator: operators.value,
        activationTrigger: "any",
        active: true,
        notificationChannel: notificationChannels
        // @ts-ignore
      }, this.activeBox.name, sensors.options[sensors.selectedIndex].text)
    }
    // TODO: what happens after a notification rule has bee created? Will the form close? Do you get some message that it worked?
  }

  selected(){
    let e = (document.getElementById("form-sensors")) as HTMLSelectElement;
    let sel = e.selectedIndex;
    let opt = e.options[sel];
    let chosenSensor = (<HTMLSelectElement><unknown>opt).textContent;
    let boxSensors = this.activeBox.sensors;
    for(let i = 0; i < boxSensors.length; i++) {
      if (chosenSensor == boxSensors[i].title){
        this.sensorUnit = boxSensors[i].unit;
        this.textForm = "Value in " + this.sensorUnit
      }
    }
  }
  configCenter(){
    this.router.navigate(
      [{ outlets: { sidebar: ['m','profile','fbox'] }}]
    )
  }
  

}
