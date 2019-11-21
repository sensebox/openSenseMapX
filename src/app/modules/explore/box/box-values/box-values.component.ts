import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Box } from 'src/app/models/box/state/box.model';

@Component({
  selector: 'osem-box-values',
  templateUrl: './box-values.component.html',
  styleUrls: ['./box-values.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxValuesComponent implements OnInit {

  @Input() box: Box;

  @Output() valueSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectValue(boxId, sensorId){
    this.valueSelected.emit({boxId, sensorId});
  }

}
