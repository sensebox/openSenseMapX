import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'osem-profile-box-create-sensors',
  templateUrl: './profile-box-create-sensors.component.html',
  styleUrls: ['./profile-box-create-sensors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBoxCreateSensorsComponent implements OnInit {

  @Input() sensors;

  @Input() selectedSensors;
  @Input() selectedSensorElements;
  @Input() loading;
  @Input() phenomena;

  @Output() sensorSelected = new EventEmitter();
  @Output() sensorElementSelected = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  selectSensor(sensor){
    this.sensorSelected.emit(sensor);
    // if(sensor.sensorElement.length === 1){
    //   console.log("ONE");
    //   this.sensorElementSelected.emit({sensor: sensor, sensorElement: sensor.sensorElement[0]});
    // }
  }

  addSensorElement(e,sensorElement) {
    // this.selectSensor(sensorElement.sensorElement);
    // e.stopPropagation();
    this.sensorElementSelected.emit(sensorElement);

  }

  checkForElement(sensor, element){
    let res = this.selectedSensorElements.filter(ele => {
      if(ele.sensor.sensor.value === sensor.sensor.value && element.phenomenon === ele.sensorElement.phenomenon){
        return true;
      }
    })
    if(res && res.length > 0){
      return true
    } else {
      return false
    }
  }
}