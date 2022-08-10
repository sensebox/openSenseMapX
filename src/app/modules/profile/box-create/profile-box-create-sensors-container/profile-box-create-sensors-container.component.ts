import { DeviceService } from 'src/app/models/device/state/device.service';
import { CreateboxService } from 'src/app/models/createbox/state/createbox.service';
import { Component, OnInit } from '@angular/core';
import { CreateboxQuery } from 'src/app/models/createbox/state/createbox.query';
import { map, flatMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DeviceQuery } from 'src/app/models/device/state/device.query';
import { PhenomenonQuery } from 'src/app/models/phenomenon/state/phenomenon.query';
import { UnitQuery } from 'src/app/models/unit/state/unit.query';

@Component({
  selector: 'osem-profile-box-create-sensors-container',
  templateUrl: './profile-box-create-sensors-container.component.html',
  styleUrls: ['./profile-box-create-sensors-container.component.scss']
})
export class ProfileBoxCreateSensorsContainerComponent implements OnInit {

  selectedDevice$ = this.createboxQuery.selectSelectedDevice$;
  selectedSensors$ = this.createboxQuery.selectSelectedSensors$;
  selectedSensorElements$ = this.createboxQuery.selectSelectedSensorElements$;
  phenomena$ = this.phenomenonQuery.selectAll({ asObject: true });
  units$ = this.unitQuery.selectAll({ asObject: true });
  deviceSub;
  loading$ = this.deviceQuery.selectLoading();
  sensors$;

  constructor(
    private createboxService: CreateboxService,
    private createboxQuery: CreateboxQuery,
    private deviceQuery: DeviceQuery,
    private phenomenonQuery: PhenomenonQuery,
    private unitQuery: UnitQuery,
    private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceSub = this.selectedDevice$.pipe(mergeMap(res => {
      if(res){
        console.log(res);
        
        if(res.label === "custom") {
          this.sensors$ = this.deviceService.getAllSensors();
        } else {
          this.sensors$ = this.deviceService.getSensors(res.id);
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
    this.createboxService.selectSensorElement(sensorElement);
  }

  updateSensorElements(elements){
    this.createboxService.updateSensorElements(elements);
  }

  removePhenoSensors(pheno){
    this.createboxService.removePhenoSensors(pheno);
  }

}
