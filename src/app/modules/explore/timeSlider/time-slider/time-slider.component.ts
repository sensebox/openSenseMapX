import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'osem-time-slider',
  templateUrl: './time-slider.component.html',
  styleUrls: ['./time-slider.component.scss']
})
export class TimeSliderComponent implements OnInit {

  @Input() dateRange;
  @Input() selectedDate; 
  @Output() dateSelected = new EventEmitter();
  
  selectDate = 1572966000000;
  step = 3600000;

  constructor() { }

  ngOnInit() {
    console.log(this.selectedDate);
  }

  changed(ev){
    console.log(new Date(this.selectedDate));
    this.dateSelected.emit(this.selectedDate);
  }

}
