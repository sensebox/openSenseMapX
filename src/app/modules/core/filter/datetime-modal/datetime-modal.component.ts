import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import bulmaCalendar from 'node_modules/bulma-calendar/dist/js/bulma-calendar.min.js';

@Component({
  selector: 'osem-datetime-modal',
  templateUrl: './datetime-modal.component.html',
  styleUrls: ['./datetime-modal.component.scss']
})
export class DatetimeModalComponent implements OnInit {

  @Output() changedActive = new EventEmitter();
  @Output() changedDateRange = new EventEmitter();
  @Output() showLiveDataEvent = new EventEmitter();
  @Output() changedDateStamp = new EventEmitter();
  @Output() closed = new EventEmitter();
  @Input() active = 'live';

  dateRangeStart;
  dateRangeEnd;
  @Input() set dateRange(value){
    if(value){
      this.dateRangeStart = value[0];
      this.dateRangeEnd = value[1];
    }
  };
  dateStampValue;
  @Input() set dateStamp(value){
    if(value){
      this.dateStampValue = value;
    }
  };

  startAt = new Date('2020-03-27T10:00:00.000Z');
  minDate = new Date('2020-03-27T10:00:00.000Z');
  maxDate = new Date(); // TODO: Round this to nearest 5minutes ?
 


  constructor(public translateService: TranslateService) { }

  ngOnInit() {        
  }

  changeActive(active){
    this.changedActive.emit(active);
    this.initCalendars();
  }

  close(){
    this.closed.emit();
  }

  updateDateRange(start, end){
    if(start && end) {
      this.changedDateRange.emit([start, end]);
      this.closed.emit();
    }
  }

  showLiveData(){
    this.showLiveDataEvent.emit();
    this.closed.emit();
  }

  updateDateStamp(date){
    this.changedDateStamp.emit(date);
    this.closed.emit();
  }

  initCalendars(){
    let that = this;
    setTimeout(function(){
      const timeStampOptions = {
        lang: that.translateService.currentLang === 'de-DE' ? 'de' : 'en',
        minuteSteps: 10,
        startTime: that.dateStampValue ? that.dateStampValue : that.startAt,
        startDate: that.dateStampValue ? that.dateStampValue : that.startAt,
        maxDate: that.maxDate,
        color: '#4EAF47'
      }

      const timeStampCalendar = bulmaCalendar.attach('#timestamp', timeStampOptions);
      const timeRangeOptions = {
        lang: that.translateService.currentLang === 'de-DE' ? 'de' : 'en',
        minuteSteps: 10,
        startDate: that.dateRangeStart ? that.dateRangeStart : that.minDate,
        startTime: that.dateRangeStart ? that.dateRangeStart : that.minDate,
        endDate: that.dateRangeEnd ? that.dateRangeEnd : that.minDate,
        endTime: that.dateRangeEnd ? that.dateRangeEnd : that.minDate,
        maxDate: that.maxDate,
        color: '#4EAF47'
      }
      const timeRangeCalendar = bulmaCalendar.attach('#timerange', timeRangeOptions);
  
      // To access to bulmaCalendar instance of an element
      const element:any = document.querySelector('#timestamp');
      if (element) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element.bulmaCalendar.on('select', datepicker => {
          that.dateStampValue = new Date(datepicker.data.value());
        });
      }
      const elementRange:any = document.querySelector('#timerange');
      if (elementRange) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        elementRange.bulmaCalendar.on('select', datepicker => {
          that.dateRangeStart = datepicker.data.date.start;
          that.dateRangeEnd = datepicker.data.date.end;
        });
      }

    },5)

  }

}
