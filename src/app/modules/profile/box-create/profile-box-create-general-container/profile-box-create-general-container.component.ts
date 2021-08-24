import { Component, OnInit } from '@angular/core';
import { CreateboxQuery } from 'src/app/models/createbox/state/createbox.query';

@Component({
  selector: 'osem-profile-box-create-general-container',
  templateUrl: './profile-box-create-general-container.component.html',
  styleUrls: ['./profile-box-create-general-container.component.scss']
})
export class ProfileBoxCreateGeneralContainerComponent implements OnInit {

  selectedDevice$ = this.createboxQuery.selectSelectedDevice$;

  constructor(private createboxQuery: CreateboxQuery) { }

  ngOnInit() {
  }

}
