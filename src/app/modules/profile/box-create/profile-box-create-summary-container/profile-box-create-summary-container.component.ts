import { Component, OnInit } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { CreateboxQuery } from 'src/app/models/createbox/state/createbox.query';
import { CreateboxService } from 'src/app/models/createbox/state/createbox.service';
import { PhenomenonQuery } from 'src/app/models/phenomenon/state/phenomenon.query';
import { UnitQuery } from 'src/app/models/unit/state/unit.query';

@Component({
  selector: 'osem-profile-box-create-summary-container',
  templateUrl: './profile-box-create-summary-container.component.html',
  styleUrls: ['./profile-box-create-summary-container.component.scss']
})
export class ProfileBoxCreateSummaryContainerComponent implements OnInit {

  selectedDevice$ = this.createboxQuery.selectSelectedDevice$;
  selectedSensorElements$ = this.createboxQuery.selectSelectedSensorElements$;
  generalForm = this.formsManager.getForm('general');
  ttnForm = this.formsManager.getForm('ttn');
  mqttForm = this.formsManager.getForm('mqtt');
  selectPhenomenon$ = this.phenomenonQuery.selectAll({ asObject: true });
  units$ = this.unitQuery.selectAll({ asObject: true });


  constructor(
    private createboxQuery: CreateboxQuery,
    private createBoxService: CreateboxService,
    private phenomenonQuery: PhenomenonQuery,
    private unitQuery: UnitQuery,
    private formsManager: AkitaNgFormsManager) { }

  ngOnInit() {

  }

  createBox(options){

    this.createBoxService.createBox(options);

  }

}
