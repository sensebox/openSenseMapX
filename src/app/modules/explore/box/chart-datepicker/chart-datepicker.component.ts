import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import bulmaCalendar from 'node_modules/bulma-calendar/dist/js/bulma-calendar.min.js';

@Component({
  selector: 'osem-chart-datepicker',
  templateUrl: './chart-datepicker.component.html',
  styleUrls: ['./chart-datepicker.component.scss']
})
export class ChartDatepickerComponent implements OnInit {

  @Input() dateRange;
  @Input() dateRangeGlobal;
  @Output() dateChanged = new EventEmitter();

  startAt = new Date();
  minDate = new Date('2018-01-01T00:00:00.000Z');
  maxDate = new Date();

  now = new Date();

  modalActive = false;

  dateRangeStart;
  dateRangeEnd;

  constructor(
    public translateService: TranslateService) { 
    // this.dateTimeAdapter.setLocale('de-DE');
  }

  ngOnInit() {

    if(this.dateRange){
      this.dateRangeStart = this.dateRange[0]
      this.dateRangeEnd = this.dateRange[1]
    }
  }

  ngOnChanges(){
    this.dateRangeStart = this.dateRange[0]
    this.dateRangeEnd = this.dateRange[1]
  }

  updateDateRange(start, end){
    this.dateChanged.emit([start, end]);
    this.closeModal();
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

  openModal(){
    this.modalActive = true;
    const timeRangeOptions = {
      lang: this.translateService.currentLang === 'de-DE' ? 'de' : 'en',
      minuteSteps: 10,
      startDate: this.dateRangeStart ? this.dateRangeStart : this.minDate,
      startTime: this.dateRangeStart ? this.dateRangeStart : this.minDate,
      endDate: this.dateRangeEnd ? this.dateRangeEnd : this.minDate,
      endTime: this.dateRangeEnd ? this.dateRangeEnd : this.minDate,
      maxDate: this.maxDate,
      color: '#4EAF47'
    }
    const timeRangeCalendar = bulmaCalendar.attach('#timerange', timeRangeOptions);
    const elementRange:any = document.querySelector('#timerange');
    if (elementRange) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      elementRange.bulmaCalendar.on('select', datepicker => {
        var dates = datepicker.data.value().split('-');
        this.dateRangeStart = new Date(dates[0]);
        this.dateRangeEnd = new Date(dates[1]);
      });
    }

  }

  closeModal(){
    this.modalActive = false;
  }
}
