import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/models/device/state/device.service';
import { DeviceQuery } from 'src/app/models/device/state/device.query';
import { CreateboxQuery } from 'src/app/models/createbox/state/createbox.query';
import { CreateboxService } from 'src/app/models/createbox/state/createbox.service';


@Component({
  selector: 'osem-profile-box-create-device-container',
  templateUrl: './profile-box-create-device-container.component.html',
  styleUrls: ['./profile-box-create-device-container.component.scss']
})
export class ProfileBoxCreateDeviceContainerComponent implements OnInit {

  selectedDevice$ = this.createboxQuery.selectSelectedDevice$;
  devices$ = this.deviceQuery.selectAll();
  loading$ = this.deviceQuery.selectLoading();

  constructor(
    private deviceService: DeviceService,
    private deviceQuery: DeviceQuery,
    private createboxQuery: CreateboxQuery,
    private createboxService: CreateboxService
  ) { }



  ngOnInit() {
    this.deviceService.get().subscribe();
  }

  selectDevice(device){
    this.createboxService.selectDevice(device);
  }

}
