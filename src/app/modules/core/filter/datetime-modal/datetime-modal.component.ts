import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


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
  @Input() set dateRange(value){
    if(value){
      this.dateRangeStart = value[0];
      this.dateRangeEnd = value[1];
    }
  };

  startAt = new Date('2020-03-27T10:00:00.000Z');
  minDate = new Date('2020-03-27T10:00:00.000Z');
  maxDate = new Date('2020-03-27T14:00:00.000Z');

  dateRangeStart;
  dateRangeEnd;
  dateStamp;


  constructor(public translateService: TranslateService) { }

  ngOnInit() {
    
  }

  changeActive(active){
    this.changedActive.emit(active);
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

}
