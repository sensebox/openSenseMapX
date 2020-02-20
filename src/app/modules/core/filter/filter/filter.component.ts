import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'osem-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() exposure;
  @Output() exposureSet = new EventEmitter();
  @Output() filtersSet = new EventEmitter();

  @Input() filters;

  constructor() { }

  ngOnInit() {
  }

  // setFilter(){
  //   this.filterSet.emit();
  // }

  setExposure(exposure){
    this.filtersSet.emit({...this.filters, exposure: exposure});
  }

  setModel(model){
    this.filtersSet.emit({...this.filters, model: model});
  }

  setGroup(group){
    this.filtersSet.emit({...this.filters, group: group});
  }

}
