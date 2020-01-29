import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/models/ui/state/ui.service';

@Component({
  selector: 'osem-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent implements OnInit {

  startAt = new Date('2019-12-31T15:00:00.000Z');
  minDate = new Date('2019-12-31T00:00:00.000Z');
  maxDate = new Date('2020-01-01T23:00:00.000Z');

  now = new Date();
  
  @Input() dateRange;
  @Output() dateChanged = new EventEmitter<any>();

  constructor(
    private dateTimeAdapter: DateTimeAdapter<any>,
    private uiService: UiService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.dateTimeAdapter.setLocale('de-DE');
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params.fromDate && params.toDate){
        this.dateChanged.emit([new Date(params.fromDate), new Date(params.toDate)]);
      } else if (this.dateRange) {
        this.uiService.setSelectedDate(null);
        this.dateChanged.emit(null);
      }
    })
  }

  dateChange(range){
    this.selectDateRnge(this.dateRange)
  }
  dateInput(range){
    // this.dateChanged.emit(this.dateRange)
  }

  selectDateRnge(dateRange){
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { fromDate: dateRange[0], toDate: dateRange[1] },
        queryParamsHandling: 'merge'
      });
  }

}
