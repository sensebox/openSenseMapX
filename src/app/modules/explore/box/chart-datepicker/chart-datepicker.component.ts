import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'osem-chart-datepicker',
  templateUrl: './chart-datepicker.component.html',
  styleUrls: ['./chart-datepicker.component.scss']
})
export class ChartDatepickerComponent implements OnInit {

  @Input() dateRange;
  @Input() dateRangeGlobal;
  @Output() dateChanged = new EventEmitter();

  startAt = new Date('2019-12-31T15:00:00.000Z');
  minDate = new Date('2019-12-31T00:00:00.000Z');
  maxDate = new Date('2020-01-01T23:00:00.000Z');

  now = new Date();

  constructor(
    public translateService: TranslateService) { 
    // this.dateTimeAdapter.setLocale('de-DE');
  }

  ngOnInit() {
  }

  dateChange(){
    console.log(this.dateRange)
    this.dateChanged.emit(this.dateRange);
  }

  lastWeek(){
    let now = new Date();
    let before = new Date()
    before.setDate(now.getDate()-7)
    this.dateChanged.emit([before, now])
  }
  last24(){
    let now = new Date();
    let before = new Date()
    before.setDate(now.getDate()-1)
    this.dateChanged.emit([before, now])
  }
  lastHour(){
    let now = new Date();
    let before = new Date()
    before.setHours(now.getHours()-1)
    this.dateChanged.emit([before, now])
  }

}
