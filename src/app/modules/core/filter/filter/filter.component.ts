import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { UiService } from 'src/app/models/ui/state/ui.service';

@Component({
  selector: 'osem-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

  @Input() exposure;
  @Input() filter;
  @Input() user;
  @Output() exposureSet = new EventEmitter();
  @Output() filtersSet = new EventEmitter();

  @Input() filters;

  constructor(private uiService: UiService) { }

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

  myBoxes(){
    console.log(this.user);
    this.uiService.setFilterIds(this.user.boxes);
  }

  allBoxes(){
    this.uiService.setFilterIds(null);
  }

}
