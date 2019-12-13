import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Box } from 'src/app/models/box/state/box.model';

@Component({
  selector: 'osem-box-chart',
  templateUrl: './box-chart.component.html',
  styleUrls: ['./box-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxChartComponent implements OnInit, OnChanges {

  @Input() data;

  // xAxisTicks = [new Date('2019-11-05T18:54:08.775Z')]
  @Output() colorsChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(){
    console.log(this.data);
  }

  test(e){
    return new Date(e).toLocaleDateString('de-DE');
  }

  changeColors(data){
    this.colorsChanged.emit(data);
  }

}
