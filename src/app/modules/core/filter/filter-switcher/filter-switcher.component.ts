import { Component, EventEmitter, OnInit, Input, ChangeDetectionStrategy, Output } from '@angular/core';
import { shrinkVertical } from 'src/app/helper/animations';

@Component({
  selector: 'osem-filter-switcher',
  templateUrl: './filter-switcher.component.html',
  styleUrls: ['./filter-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [shrinkVertical]
})
export class FilterSwitcherComponent implements OnInit {

  @Input() activeTab;
  @Input() selectedPheno;
  @Input() minimizedBoolean; 
  @Input() change;
  @Input() user;

  @Input() filters;
  @Input() stats;

  @Output() activeChanged = new EventEmitter();
  @Output() phenoSelected = new EventEmitter();
  @Output() changeToggled = new EventEmitter();
  @Output() minimized = new EventEmitter();
  @Output() infoPhenoSelected = new EventEmitter();

  @Output() filtersSet = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  changeActive(active){
    this.activeChanged.emit(active);
  }

  selectPheno(pheno){
    this.phenoSelected.emit(pheno);
  }

  minimize(){
    this.minimized.emit();
  }
  toggleChange(){
    this.changeToggled.emit();
  }

  selectInfoPheno(pheno){
    this.infoPhenoSelected.emit(pheno);
  }

  // setExposure(exposure){
  //   this.exposureSet.emit(exposure);
  // }

  setFilters(filters){
    this.filtersSet.emit(filters);
  }


}
