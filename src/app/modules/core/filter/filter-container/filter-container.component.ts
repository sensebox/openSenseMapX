import { Component, OnInit } from '@angular/core';
import { BoxService } from 'src/app/models/box/state/box.service';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { combineLatest } from 'rxjs';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { SensorService } from 'src/app/models/sensor/state/sensor.service';

@Component({
  selector: 'osem-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss']
})
export class FilterContainerComponent implements OnInit {

  // selectUI$ = this.boxQuery.selectUI$;
  selectDateRange$ = this.uiQuery.selectDateRange$;
  selectedPheno$ = this.uiQuery.selectSelectedPheno$;

  constructor(
    private boxService: BoxService, 
    private sensorService: SensorService,
    private uiService: UiService, 
    private uiQuery: UiQuery) { }

  ngOnInit() {
    let that = this;
    // this.selectDateRange$.subscribe(res => console.log(res));
    combineLatest(this.selectDateRange$, this.selectedPheno$).subscribe(res => {
      console.log(res);
      if(res[0] && res[1]){
        console.log(res)
        this.boxService.getValues(res[1].title, res[0]).subscribe();
      }
    })
  }

  changeDateRange(range){
    this.uiService.updateDateRange(range);
    this.sensorService.resetHasData();
  }

  changeStartDate(startDate){
    this.uiService.updateStartDate(startDate);
  }

  changeEndDate(startDate){
    this.uiService.updateEndDate(startDate);
  }

  selectPheno(pheno){
    this.uiService.updateSelectedPheno(pheno);
  }

}
