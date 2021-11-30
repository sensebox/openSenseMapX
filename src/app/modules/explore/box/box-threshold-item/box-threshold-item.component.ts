import { Component, OnInit, Input } from '@angular/core';
import { Threshold } from '../threshold';

@Component({
  selector: 'osem-box-threshold-item',
  templateUrl: './box-threshold-item.component.html',
  styleUrls: ['./box-threshold-item.component.scss']
})
export class BoxThresholdItemComponent implements OnInit {

  @Input() threshold: Threshold;

  constructor() { }

  ngOnInit(): void {
  }

}
