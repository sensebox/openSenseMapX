import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'osem-profile-box-create-device',
  templateUrl: './profile-box-create-device.component.html',
  styleUrls: ['./profile-box-create-device.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBoxCreateDeviceComponent implements OnInit {

  @Input() devices;
  @Input() selectedDevice;
  @Input() loading;

  @Output() deviceSelected = new EventEmitter();

  constructor( ) { }

  ngOnInit() {
  }

  selectDevice(device){
    this.deviceSelected.emit(device);
  }

}
