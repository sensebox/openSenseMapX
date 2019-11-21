import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Box } from 'src/app/models/box/state/box.model';

@Component({
  selector: 'osem-box-chart',
  templateUrl: './box-chart.component.html',
  styleUrls: ['./box-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxChartComponent implements OnInit {

  @Input() data;

  xAxisTicks = [new Date('2019-11-05T18:54:08.775Z')]

  constructor() { }

  ngOnInit() {
    console.log({"name": "test", "series": this.data});
  }

  test(e){
    return new Date(e).toLocaleDateString('en-US');
  }

}
