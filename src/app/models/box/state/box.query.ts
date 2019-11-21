import { Injectable } from '@angular/core';
import { QueryEntity, EntityUIQuery } from '@datorama/akita';
import { BoxStore, BoxState, BoxUIState, BoxUI } from './box.store';
import { Box } from './box.model';

@Injectable({ providedIn: 'root' })
export class BoxQuery extends QueryEntity<BoxState> {

  ui: EntityUIQuery<BoxUIState, BoxUI>;

  selectUI$ = this.select('ui');
  // selectselectedPheno$ = this.select('ui');
  selectDateRange$ = this.select(state => state.ui.dateRange);
  selectSelectedDate$ = this.select(state => state.ui.selectedDate);
  
  selectDisplayTimeSlider$ = this.select(state => state.ui.displayTimeSlider);

  selectSelectedPheno$ = this.select(state => state.ui.selectedPheno);


  // get ui() {
  //   return this.getValue().ui;
  // }

  constructor(protected store: BoxStore) {
    super(store);
    this.createUIQuery();
  }

}
