import { Component, Input, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit() {
    console.log(this.generalForm);
  }

}
