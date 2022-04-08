import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'osem-profile-boxes-edit-sensors',
  templateUrl: './profile-boxes-edit-sensors.component.html',
  styleUrls: ['./profile-boxes-edit-sensors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBoxesEditSensorsComponent implements OnInit {

  @Input() box;
  @Input() set sensors(sensors) {
    if (sensors) {
      this.groupedSensors = this.groupByPhenomenon(sensors);
    }
  };
  @Input() units;
  @Output() boxSaved = new EventEmitter();

  addSensorBoolean = false;
  groupedSensors = {};
  possibleUnits;
  activeSensor;
  showModal = false;

  sensorForm = this.builder.group({
    phenomenon: ['', [Validators.required]],
    sensorWikiSensorType: [''],
    unit:['']
  })

  constructor(
    private builder: FormBuilder,
    private toasterService: ToasterService
    ) { }

  ngOnInit() {
  }

  saveBox(box) {
    this.boxSaved.emit(box);
  }

  groupByPhenomenon(sensors) {

    let groupedSensors = {};

    for (let sensor of sensors) {
      for (let sensorElement of sensor.sensorElement) {
        if (groupedSensors[sensorElement.phenomenon]) {
          groupedSensors[sensorElement.phenomenon].push({ ...sensorElement, sensor: sensor })
        } else {
          groupedSensors[sensorElement.phenomenon] = [{ ...sensorElement, sensor: sensor }];
        }
      }
    }
    return groupedSensors;
  }

  showPossibleUnits(sensor){
    let tmp_unit = this.groupedSensors[this.sensorForm.value.phenomenon][0].unit;
    this.possibleUnits = [this.units[tmp_unit]]
  }

  addSensor(box) {
    this.boxSaved.emit({
      _id: box,
      sensors: [
        {
          "new": true,
          "edited":true,
          "sensorType": this.sensorForm.value.sensorWikiSensorType,
          "title": this.sensorForm.value.phenomenon,
          "unit": this.sensorForm.value.unit
        }]
    })
  }
  openModal(sensor){
    this.showModal = true;
    this.activeSensor = sensor;
  }

  closeModal(){
    this.showModal = false;
  }

  deleteSensor(box) {
    // hier popup für bestätigung
    this.boxSaved.emit({
      _id: box,
      sensors: [
        {
          "_id": this.activeSensor._id,
          "deleted": true
        }
      ]
    })
    this.closeModal();
    this.toasterService.pop('success','','Sensor removed');

  }

}

