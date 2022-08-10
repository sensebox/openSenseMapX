import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'osem-profile-boxes-edit-sensors',
  templateUrl: './profile-boxes-edit-sensors.component.html',
  styleUrls: ['./profile-boxes-edit-sensors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBoxesEditSensorsComponent implements OnInit {

  openDeleteModal;

  @Input() box;
  @Input() set sensors(sensors){
    if(sensors){
      this.groupedSensors = this.groupByPhenomenon(sensors);
      console.log(this.groupedSensors);
    }
  };
  @Output() boxSaved = new EventEmitter();

  addSensorBoolean = false;
  groupedSensors = {};

  openDeleteModal;

  sensorForm = this.builder.group({
    phenomenon: ['', [Validators.required]],
    sensorWikiSensorType: ['']
  })

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
  }

  saveBox(box){
    this.boxSaved.emit(box);
  }

  groupByPhenomenon(sensors){

    let groupedSensors = {};

    for(let sensor of sensors) {
      for(let sensorElement of sensor.elements){
        if(groupedSensors[sensorElement.phenomenon]){
          groupedSensors[sensorElement.phenomenon].push({...sensorElement, sensor: sensor})
        } else {
          groupedSensors[sensorElement.phenomenon] = [{...sensorElement, sensor: sensor}];
        }
      }
    }
    return groupedSensors;
  }

  deleteSensor(box, sensor){

    this.boxSaved.emit({
       _id: box,
        sensors: [
            {
                "_id": sensor._id,
                "deleted": true,
            }
        ]
    })
  }
}
