import { DeviceService } from 'src/app/models/device/state/device.service';
import { CreateboxService } from 'src/app/models/createbox/state/ui.service';
import { Component, OnInit } from '@angular/core';
import { CreateboxQuery } from 'src/app/models/createbox/state/createbox.query';
import { map, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'osem-profile-box-create-sensors-container',
  templateUrl: './profile-box-create-sensors-container.component.html',
  styleUrls: ['./profile-box-create-sensors-container.component.scss']
})
export class ProfileBoxCreateSensorsContainerComponent implements OnInit {

  selectedDevice$ = this.createboxQuery.selectSelectedDevice$;
  deviceSub;

  constructor(
    private createboxService: CreateboxService,
    private createboxQuery: CreateboxQuery,
    private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceSub = this.selectedDevice$.pipe(flatMap(res => {
      if(res){
        console.log(res);
        return this.deviceService.getSensors(res.iri);
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

}
