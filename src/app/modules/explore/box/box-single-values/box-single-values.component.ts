import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Box } from 'src/app/models/box/state/box.model';

@Component({
  selector: 'osem-box-single-values',
  templateUrl: './box-single-values.component.html',
  styleUrls: ['./box-single-values.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxSingleValuesComponent {

  @Input() box: Box;
  @Input() colors;
  @Input() detect;
  
  @Input() activeSensorTypes;
  @Input() activeSensors;
  
  @Output() valueSelected = new EventEmitter();
  @Output() valueAdded = new EventEmitter();

  constructor() { }

  selectValue(sensor){
    this.valueSelected.emit(sensor);
  }
  
  addValue(sensor) {
    this.valueAdded.emit(sensor);
  }
}
