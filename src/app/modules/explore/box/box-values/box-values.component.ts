import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges } from '@angular/core';
import { Box } from 'src/app/models/box/state/box.model';

@Component({
  selector: 'osem-box-values',
  templateUrl: './box-values.component.html',
  styleUrls: ['./box-values.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxValuesComponent implements OnInit, OnChanges {

  @Input() box: Box;
  @Input() compareTo;
  @Input() compareModus;
  @Input() compareData;

  @Output() valueSelected = new EventEmitter();
  @Output() valueAdded = new EventEmitter();
  @Output() compareRemoved = new EventEmitter();

  @Output() compareModusToggled = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.compareData);
  }
  ngOnChanges(){
    console.log(this.compareData)
  }

  selectValue(boxId, sensorId){
    this.valueSelected.emit({boxId, sensorId});
  }

  addValue(boxId, sensorId) {
    this.valueAdded.emit({boxId, sensorId});
  }

  toggleCompareModus(){
    this.compareModusToggled.emit(!this.compareModus);
  }
  removeCompare(box){
    this.compareRemoved.emit(box);
  }

}
