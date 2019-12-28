import { Component, OnInit } from '@angular/core';
import { BoxService } from 'src/app/models/box/state/box.service';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { combineLatest } from 'rxjs';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { SensorService } from 'src/app/models/sensor/state/sensor.service';
import { slideInOutHorizontalBoolean } from 'src/app/helper/animations';

@Component({
  selector: 'osem-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  animations: [slideInOutHorizontalBoolean]
})
export class FilterContainerComponent implements OnInit {

  // selectUI$ = this.boxQuery.selectUI$;
  selectDateRange$ = this.uiQuery.selectDateRange$;
  selectedPheno$ = this.uiQuery.selectSelectedPheno$;
  activeTab = 'phenos';

  minimizedBoolean = false;
  minimizedFilter = false;

  constructor(
    private boxService: BoxService, 
    private sensorService: SensorService,
    private uiService: UiService, 
    private uiQuery: UiQuery) { }

  ngOnInit() {
    let that = this;
    // this.selectDateRange$.subscribe(res => console.log(res));
    combineLatest(this.selectDateRange$, this.selectedPheno$).subscribe(res => {
      if(res[0] && res[1]){
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

  setActiveTab(activeTab){
    this.activeTab = activeTab;
    if(this.minimizedBoolean)
      this.minimizedBoolean = false;
  }

  minimize(){
    this.minimizedBoolean = !this.minimizedBoolean;
  }

  toggleMinimizeFilter(){
    this.minimizedFilter = !this.minimizedFilter;
  }
}
