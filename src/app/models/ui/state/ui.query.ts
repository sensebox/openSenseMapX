import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UiStore, UiState } from './ui.store';

@Injectable({ providedIn: 'root' })
export class UiQuery extends Query<UiState> {

  selectColors$ = this.select(state => state.colors);
  selectActiveSensorTypes$ = this.select(state => state.activeSensorTypes);
  selectSelectedPheno$ = this.select(state => state.selectedPheno);
  selectDateRange$ = this.select(state => state.dateRange);
  selectDateRangeChart$ = this.select(state => state.dateRangeChart);
  selectSelectedDate$ = this.select(state => state.selectedDate);

  constructor(protected store: UiStore) {
    super(store);
  }

}
