import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { DateTimeAdapter } from 'ng-pick-datetime';

@Component({
  selector: 'osem-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent implements OnInit {

  startAt = new Date('2019-11-05T15:00:00.000Z');
  minDate = new Date('2019-11-05T15:00:00.000Z');
  maxDate = new Date('2019-11-06T15:00:00.000Z');
  @Input() dateRange;
  @Output() dateChanged = new EventEmitter<any>();

  constructor(private dateTimeAdapter: DateTimeAdapter<any>) {
    this.dateTimeAdapter.setLocale('de-DE');
   }

  ngOnInit() {
  }

  dateChange(range){
    this.dateChanged.emit(this.dateRange)
  }
  dateInput(range){
    console.log('input');
    // this.dateChanged.emit(this.dateRange)
  }

}
