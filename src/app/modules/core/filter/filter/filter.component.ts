import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'osem-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() exposure;
  @Output() exposureSet = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  setExposure(exposure){
    this.exposureSet.emit(exposure);
  }

}
