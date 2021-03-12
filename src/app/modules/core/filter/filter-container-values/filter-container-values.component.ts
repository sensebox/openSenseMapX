import { Component, OnInit } from '@angular/core';
import { UiQuery } from 'src/app/models/ui/state/ui.query';

@Component({
  selector: 'osem-filter-container-values',
  templateUrl: './filter-container-values.component.html',
  styleUrls: ['./filter-container-values.component.scss']
})
export class FilterContainerValuesComponent implements OnInit {

  selectedPheno$ = this.uiQuery.selectSelectedPheno$;
  selectedDate$ = this.uiQuery.selectSelectedDate$;
  filter$ = this.uiQuery.selectFilters$;

  constructor(private uiQuery: UiQuery) { }

  ngOnInit() {
  }

}
