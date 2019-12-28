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
  @Output() activeChanged = new EventEmitter();
  @Output() phenoSelected = new EventEmitter();
  @Output() minimized = new EventEmitter();

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


}
