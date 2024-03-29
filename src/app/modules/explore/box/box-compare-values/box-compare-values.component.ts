import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

//Displays the values for comparing different boxes
@Component({
  selector: 'osem-box-compare-values',
  templateUrl: './box-compare-values.component.html',
  styleUrls: ['./box-compare-values.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxCompareValuesComponent implements OnInit {

  @Input() boxes;
  @Input() combinedData;
  @Input() compareTo;
  @Input() colors;
  @Input() activePhenos;
  @Input() selectedDate;

  @Output() phenoSelected = new EventEmitter();
  @Output() boxRemoved = new EventEmitter();
  @Output() compareClosed = new EventEmitter();

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }

  selectPheno(pheno){
    this.phenoSelected.emit(pheno);
  }

  removeBox(id){
    this.boxRemoved.emit(id);
  }

  closeCompare(){
    this.compareClosed.emit();
  }

}
