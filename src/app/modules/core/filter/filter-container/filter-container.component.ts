import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, empty, of } from 'rxjs';

import { BoxService } from 'src/app/models/box/state/box.service';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { SensorService } from 'src/app/models/sensor/state/sensor.service';
import { slideInOutHorizontalBoolean } from 'src/app/helper/animations';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { startWith, switchMap } from 'rxjs/operators';
import { MapService } from 'src/app/modules/explore/services/map.service';

@Component({
  selector: 'osem-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  animations: [slideInOutHorizontalBoolean]
})
export class FilterContainerComponent implements OnInit {

  selectDateRange$ = this.uiQuery.selectDateRange$;
  selectedPheno$ = this.uiQuery.selectSelectedPheno$;
  filterVisible$ = this.uiQuery.selectFilterVisible$;
  searchTerm$ = this.uiQuery.selectSearchTerm$;
  locationAutocompleteResults$ = this.uiQuery.selectLocationAutocompleteResults$;
  
  filters$ = this.uiQuery.selectFilters$;
  exposure$ = this.uiQuery.selectExposure$;

  activeTab = 'phenos';
  searchTimeout;
  autoCompleteResults$;
  minimizedBoolean = false;
  change:boolean = true;


  constructor(
    private boxService: BoxService,
    private boxQuery: BoxQuery,
    private sensorService: SensorService,
    private uiService: UiService,
    private mapService: MapService,
    private uiQuery: UiQuery) { }

  ngOnInit() {
   
    combineLatest(this.selectDateRange$, this.selectedPheno$).subscribe(res => {
      if(res[0] && res[1]){
        this.boxService.getValues(res[1].title, res[0]).subscribe();
        if(window.matchMedia("(max-width: 768px)").matches){
          this.uiService.setFilterVisible(false);
        }
      }
    })

    this.autoCompleteResults$ = this.searchTerm$.pipe(
      startWith(''),
      switchMap(value => {
        if(value && value.length > 2){
          return this.boxQuery.selectSearchResultsWithSensors(value);
        } else {
          return of([]);
        }
      })
    );

    this.autoCompleteResults$.subscribe(res => {
      this.uiService.setSearchResults(res);
    })
    // this.searchTerm$.subscribe(res => {
    //   clearTimeout(this.searchTimeout);
    //   let that = this;
    //   this.searchTimeout = setTimeout(function(){
    //     console.log(that.boxQuery.search(res));
    //   },150)
    // })


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
    this.change = false;
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
    this.uiService.toggleFilterVisible();
  }

  search(searchTerm){
    if(searchTerm.length > 1){
      this.uiService.fetchGeocodeResults(searchTerm).subscribe(res => {
        // console.log(res);
      }, (err) => {
        // console.log(err)
      });
      this.uiService.setSearchTerm(searchTerm);
    }
  }
  selectResult(box){
    this.mapService.flyTo(box.currentLocation.coordinates);
  }
  selectLocResult(loc){
    this.mapService.flyTo([loc.lon, loc.lat]);
  }

  toggleChange(){
    this.change = !this.change;
  }
  
  selectInfoPheno(pheno){
    this.uiService.setInfoPheno(pheno);
  }

  setFilters(filters) {
    this.uiService.setFilters(filters);
  }
}
