import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { slideInOutHorizontal } from 'src/app/helper/animations';

@Component({
  selector: 'osem-time-slider',
  templateUrl: './time-slider.component.html',
  styleUrls: ['./time-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInOutHorizontal]
})
export class TimeSliderComponent implements OnInit {

  @Input() dateRange;
  @Input() selectedDate; 
  @Input() selectedPheno; 
  @Output() dateSelected = new EventEmitter();
  
  selectDate = 1572966000000;
  step = 3600000;

  constructor() { }

  ngOnInit() {
    console.log(this.selectedDate);
  }

  changed(ev){
    // console.log(new Date(this.selectedDate));
    this.dateSelected.emit(new Date(this.selectedDate));
  }

}
