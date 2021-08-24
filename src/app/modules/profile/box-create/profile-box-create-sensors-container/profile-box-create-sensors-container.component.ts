import { DeviceService } from 'src/app/models/device/state/device.service';
import { CreateboxService } from 'src/app/models/createbox/state/createbox.service';
import { Component, OnInit } from '@angular/core';
import { CreateboxQuery } from 'src/app/models/createbox/state/createbox.query';
import { map, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DeviceQuery } from 'src/app/models/device/state/device.query';
import { PhenomenonQuery } from 'src/app/models/phenomenon/state/phenomenon.query';

@Component({
  selector: 'osem-profile-box-create-sensors-container',
  templateUrl: './profile-box-create-sensors-container.component.html',
  styleUrls: ['./profile-box-create-sensors-container.component.scss']
})
export class ProfileBoxCreateSensorsContainerComponent implements OnInit {

  selectedDevice$ = this.createboxQuery.selectSelectedDevice$;
  selectedSensors$ = this.createboxQuery.selectSelectedSensors$;
  selectedSensorElements$ = this.createboxQuery.selectSelectedSensorElements$;
  selectPhenomenon$ = this.phenomenonQuery.selectAll({ asObject: true });
  deviceSub;
  loading$ = this.deviceQuery.selectLoading();
  sensors$;

  constructor(
    private createboxService: CreateboxService,
    private createboxQuery: CreateboxQuery,
    private deviceQuery: DeviceQuery,
    private phenomenonQuery: PhenomenonQuery,
    private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceSub = this.selectedDevice$.pipe(flatMap(res => {
      if(res){
        if(res.label === "custom") {
          this.sensors$ = this.deviceService.getAllSensors();
        } else {
          this.sensors$ = this.deviceService.getSensors(res.iri);
        }
      } else {
        return of({})
      }
    })).subscribe(res => {
      console.log(res);
    })
  }

  ngOnDestroy(){
    this.deviceSub.unsubscribe();
  }

  selectSensors(sensor){
    this.createboxService.selectSensor(sensor);
  }
  selectSensorElement(sensorElement){
    console.log("SELEEEECT SENSOR ELE", sensorElement)
    this.createboxService.selectSensorElement(sensorElement);
  }

}
