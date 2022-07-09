import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { BoxService } from 'src/app/models/box/state/box.service';
import { DeviceService } from 'src/app/models/device/state/device.service';

@Component({
  selector: 'osem-profile-boxes-edit-sensors-container',
  templateUrl: './profile-boxes-edit-sensors-container.component.html',
  styleUrls: ['./profile-boxes-edit-sensors-container.component.scss']
})
export class ProfileBoxesEditSensorsContainerComponent implements OnInit {


  activeRouteSub;
  boxSub;
  box$;
  sensors$;

  constructor(
    private boxQuery: BoxQuery,
    private boxService: BoxService,
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService
  ) { }

  ngOnInit() {

    this.activeRouteSub = this.activatedRoute.parent.params.subscribe(params => {
      if(params.id){
        this.box$ = this.boxQuery.selectEntityWithSensor(params.id);
      } else {
        this.box$ = undefined;
      }
    });

    this.boxSub = this.box$.subscribe(box => {
      if(box){
        if(box.sensorWikiModel === "custom" || !box.sensorWikiModel) {
          this.sensors$ = this.deviceService.getAllSensors();
        } else {
          this.sensors$ = this.deviceService.getSensors(box.sensorWikiModel);
        }
      }
    })
  }

  ngOnDestroy(){
    this.activeRouteSub.unsubscribe();
    this.boxSub.unsubscribe();
  }

  saveBox(box){
    this.boxService.saveBox(box);
  }
}
