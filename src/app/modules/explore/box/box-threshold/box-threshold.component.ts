import { Component, OnInit } from '@angular/core';
import { THRESHOLDS } from '../mock-threshold';
import { Threshold } from '../threshold';

@Component({
  selector: 'osem-box-threshold',
  templateUrl: './box-threshold.component.html',
  styleUrls: ['./box-threshold.component.scss']
})
export class BoxThresholdComponent implements OnInit {

  thresholds: Threshold[] = THRESHOLDS;

  constructor() { }

  ngOnInit(): void {
  }

}
