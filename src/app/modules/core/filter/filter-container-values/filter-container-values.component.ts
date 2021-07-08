import { Component, OnInit } from '@angular/core';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';

@Component({
  selector: 'osem-filter-container-values',
  templateUrl: './filter-container-values.component.html',
  styleUrls: ['./filter-container-values.component.scss']
})
export class FilterContainerValuesComponent implements OnInit {

  selectedPheno$ = this.uiQuery.selectSelectedPheno$;
  selectedDate$ = this.uiQuery.selectSelectedDate$;
  filter$ = this.uiQuery.selectFilters$;
  timeMode$ = this.uiQuery.selectActiveTimeMode$;
  stats$ = this.uiQuery.selectStats$;

  constructor(private uiQuery: UiQuery, private uiService: UiService) { }

  ngOnInit() {
  }

  backToLive(){
    this.uiService.updateDateRange(null);
    this.uiService.setSelectedDate(null);
    this.uiService.updateActiveTimeMode('live');
    // this.mapService.reactivateBaseLayer();
    // this.router.navigate(
    //   [], 
    //   {
    //     relativeTo: this.activatedRoute,
    //     queryParams: newQueryParams
    //   }
    // );
  }

  openPheno(){
    this.uiService.setFilterVisible(true);
    this.uiService.setActiveTab('phenos');
  }

  openFilter(){
    this.uiService.setFilterVisible(true);
    this.uiService.setActiveTab('filter');
  }
  
  openDate(){
    this.uiService.setShowDateModal(true);
  }

}
