import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateTimeAdapter } from 'ng-pick-datetime';

@Component({
  selector: 'osem-chart-datepicker',
  templateUrl: './chart-datepicker.component.html',
  styleUrls: ['./chart-datepicker.component.scss']
})
export class ChartDatepickerComponent implements OnInit {

  @Input() dateRange;
  @Input() dateRangeGlobal;
  @Output() dateChanged = new EventEmitter();

  constructor(private dateTimeAdapter: DateTimeAdapter<any>) { 
    this.dateTimeAdapter.setLocale('de-DE');
  }

  ngOnInit() {
  }

  dateChange(){
    this.dateChanged.emit(this.dateRange);
  }

}
