import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { BoxService } from 'src/app/models/box/state/box.service';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';

@Component({
  selector: 'osem-datetime-modal-container',
  templateUrl: './datetime-modal-container.component.html',
  styleUrls: ['./datetime-modal-container.component.scss']
})
export class DatetimeModalContainerComponent implements OnInit {

  showModal$ = this.uiQuery.selectShowDateModal$;
  selectedDateRange$ = this.uiQuery.selectDateRange$;
  selectedDateStamp$ = this.uiQuery.selectDateStamp$;
  active = 'live';

  constructor(
    private uiQuery: UiQuery, 
    private uiService: UiService, 
    private boxService: BoxService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  close(){
    this.uiService.setShowDateModal(false);
  }

  changeActive(active){
    this.active = active;
  }

  changeDateRange(range){
    this.boxService.setDataFetched(false);
    this.uiService.updateActiveTimeMode('timerange');
    this.uiService.updateDateRange(range);
    this.selectDateRange(range)
    // this.sensorService.resetHasData();
  }

  showLiveData(){
    this.uiService.updateActiveTimeMode('live');
    this.removeDates();
  }

  changeDateStamp(date){
    this.uiService.updateActiveTimeMode('timestamp');
    this.boxService.setDataFetched(false);
    this.uiService.updateDateStamp(date);
  }

  removeDates(){
    const { fromDate, toDate, ...newQueryParams} = this.activatedRoute.snapshot.queryParams;
    // this.mapService.removeDateLayer(new Date(this.selectedDate).toISOString());
    this.uiService.updateDateRange(null);
    this.uiService.updateDateStamp(null);
    this.boxService.setDateRangeData(null);
    this.uiService.setSelectedDate(null);
    // this.mapService.reactivateBaseLayer();
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: newQueryParams
      }
    );
  }


  selectDateRange(dateRange){
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { fromDate: dateRange[0].toISOString(), toDate: dateRange[1].toISOString() },
        queryParamsHandling: 'merge'
      });
  }


}
