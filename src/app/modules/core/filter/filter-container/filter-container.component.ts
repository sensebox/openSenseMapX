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
import { ActivatedRoute } from '@angular/router';
import { Map2Service } from 'src/app/modules/explore/services/map2.service';
import { SessionQuery } from 'src/app/models/session/state/session.query';

@Component({
  selector: 'osem-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  animations: [slideInOutHorizontalBoolean]
})
export class FilterContainerComponent implements OnInit {

  showDateModal$ = this.uiQuery.selectShowDateModal$;
  selectedDateRange$ = this.uiQuery.selectDateRange$;
  selectedDateStamp$ = this.uiQuery.selectDateStamp$;
  selectActiveTimeMode$ = this.uiQuery.selectActiveTimeMode$
  selectedPheno$ = this.uiQuery.selectSelectedPheno$;
  filterVisible$ = this.uiQuery.selectFilterVisible$;
  user$ = this.sessionQuery.user$;
  searchTerm$ = this.uiQuery.selectSearchTerm$;
  locationAutocompleteResults$ = this.uiQuery.selectLocationAutocompleteResults$;
  
  filters$ = this.uiQuery.selectFilters$;

  activeTab = 'phenos';
  searchTimeout;
  autoCompleteResults$;
  minimizedBoolean = false;
  change:boolean = true;
  resultsActive = false;


  constructor(
    private boxService: BoxService,
    private boxQuery: BoxQuery,
    private sensorService: SensorService,
    private uiService: UiService,
    private mapService: Map2Service,
    private activatedRoute: ActivatedRoute,
    private sessionQuery: SessionQuery,
    private uiQuery: UiQuery) { }

  ngOnInit() {
   
    // fetch data for timerange-display
    // combineLatest(this.selectedDateRange$, this.selectedPheno$).subscribe(res => {
    //   if(res[0] && res[1]){
    //     this.uiService.setClustering(false);
    //     // this.mapService.hideAllBaseLayers();
    //     this.boxService.getValues(res[1].title, res[0], (this.activatedRoute.snapshot.params.bbox ? this.activatedRoute.snapshot.params.bbox : this.mapService.getBounds())).subscribe();
    //     if(window.matchMedia("(max-width: 768px)").matches){
    //       this.uiService.setFilterVisible(false);
    //     }
    //   } else if (!res[0]) {
    //     this.boxService.setDateRangeData(null);
    //   }
    // })

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
  }

  changeDateRange(range){
    this.uiService.updateDateRange(range);
    // this.uiService.updateActiveTimeMode("timerange");
    this.sensorService.resetHasData();
  }

  changeStartDate(startDate){
    this.uiService.updateStartDate(startDate);
  }

  changeEndDate(startDate){
    this.uiService.updateEndDate(startDate);
  }

  selectPheno(pheno){
    //set dataLoaded to false if timeline active
    this.boxService.setDataFetched(false);
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
    } else {
      this.uiService.setSearchTerm("");
    }
  }
  selectResult(box){
    // this.mapService.flyTo(box.currentLocation.coordinates);
  }
  selectLocResult(loc){
    this.mapService.flyTo([loc.lon, loc.lat]);
  }

  enter(){
    this.resultsActive = true;
  }
  leave(){
    let that = this;
    setTimeout(function(){
      that.resultsActive = false;
    },100)
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
  toggleDateModal(showDateModal){
    this.uiService.setShowDateModal(!showDateModal);
  }
}
