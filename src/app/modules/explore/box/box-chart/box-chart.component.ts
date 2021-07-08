import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'osem-box-chart',
  templateUrl: './box-chart.component.html',
  styleUrls: ['./box-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxChartComponent implements OnInit {

  @Input() data;
  @Input() selectedDate;
  @Input() activeSensors;
  @Input() loading;
  @Input() dateRange;
  @Input() dateRangeChart;
  
  @Output() dateRangeChanged = new EventEmitter();
  @Output() colorsChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  test(e){
    return new Date(e).toLocaleDateString('de-DE');
  }

  changeColors(data){
    this.colorsChanged.emit(data);
  }

  changeDateRangeChart(dateRange){
    this.dateRangeChanged.emit(dateRange);
  }

}
