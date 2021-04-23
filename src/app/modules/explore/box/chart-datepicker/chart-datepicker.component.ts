import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  }

  closeModal(){
    this.modalActive = false;
  }
}
