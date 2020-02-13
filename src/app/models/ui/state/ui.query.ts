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
  selectFilterVisible$ = this.select(state => state.fitlerVisible);
  selectSearchTerm$ = this.select(state => state.searchTerm);
  selectSearchResults$ = this.select(state => state.searchResults);
  selectLocationAutocompleteResults$ = this.select(state => state.locationAutocompleteResults);
  selectClustering$ = this.select(state => state.clustering);
  selectNumbers$ = this.select(state => state.numbers);
  selectCircles$ = this.select(state => state.circles);
  selectCluster$ = this.select(state => state.cluster);
  
  selectLanguage$ = this.select(state => state.language);
  selectTheme$ = this.select(state => state.theme);

  constructor(protected store: UiStore) {
    super(store);
  }

}
