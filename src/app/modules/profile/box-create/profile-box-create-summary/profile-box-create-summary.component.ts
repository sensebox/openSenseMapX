import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'osem-profile-box-create-summary',
  templateUrl: './profile-box-create-summary.component.html',
  styleUrls: ['./profile-box-create-summary.component.scss']
})
export class ProfileBoxCreateSummaryComponent implements OnInit {

  @Input() selectedDevice;
  @Input() generalForm;
  @Input() selectedSensorElements;
  @Input() ttnForm;
  @Input() mqttForm;
  @Input() phenomena;
  @Input() units;

  @Output() boxCreated = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  createBox(){
    let options = {...this.generalForm.value, location: [0,0]}

    //convert sensors in right format for api
    let sensors = this.selectedSensorElements.map(sensor => {
      return { 
        sensorWikiType: sensor.sensor.sensor.value, 
        sensorWikiUnit: sensor.sensorElement.unit, 
        sensorWikiPhenomenon: sensor.sensorElement.phenomenon,
        unit: sensor.sensorElement.unit,
        title: this.phenomena[sensor.sensorElement.phenomenon].label[0].value,
        sensorType: sensor.sensor.sensor.value
      }
    })

    options = {
      ...options, 
      sensorWikiModel: this.selectedDevice.iri ? this.selectedDevice.iri : this.selectedDevice, 
      ttn: this.ttnForm.value.useTTN ? this.ttnForm.value : undefined, 
      mqtt: this.mqttForm.value.useMQTT ? this.mqttForm.value : undefined, 
      sensors: sensors
    }
    this.boxCreated.emit(options)
  }

}
