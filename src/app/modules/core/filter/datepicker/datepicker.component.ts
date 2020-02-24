import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'osem-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent implements OnInit {

  startAt = new Date('2019-12-31T15:00:00.000Z');
  minDate = new Date('2019-01-01T00:00:00.000Z');
  maxDate = new Date('2020-26-02T23:00:00.000Z');

  now = new Date();
  
  @Input() dateRange;
  @Output() dateChanged = new EventEmitter<any>();
  oldDates;

  constructor(
    private dateTimeAdapter: DateTimeAdapter<any>,
    private uiService: UiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public translateService: TranslateService) {
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params.fromDate && params.toDate){
        const fromDate = new Date(params.fromDate);
        const toDate = new Date(params.toDate);
        if(!this.oldDates || (this.oldDates[0].getTime() != fromDate.getTime() || this.oldDates[1].getTime() != toDate.getTime())) {
          this.dateChanged.emit([fromDate, toDate]);
        }
       this.oldDates = [fromDate, toDate];
      } else if (this.dateRange) {
        this.uiService.setSelectedDate(null);
        this.dateChanged.emit(null);
      }
    })
  }

  dateChange(){
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
        queryParams: { fromDate: dateRange[0].toISOString(), toDate: dateRange[1].toISOString() },
        queryParamsHandling: 'merge'
      });
  }

}
