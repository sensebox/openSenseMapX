import { Injectable } from '@angular/core';
import { UiStore } from './ui.store';
import { Ui } from './ui.model';
import { ColorHelper } from '@swimlane/ngx-charts';

@Injectable({ providedIn: 'root' })
export class UiService {

  constructor(private uiStore: UiStore) {
  }

  update(ui: Partial<Ui>) {
    this.uiStore.update(ui);
  }

  updateColors(colors: ColorHelper){
    this.uiStore.update({colors: colors});
  }

  setActiveSensorTypes(types){
    this.uiStore.setActiveSensorTypes(types);
  }

  updateSelectedPheno(pheno) {
    this.uiStore.updateSelectedPheno(pheno);
  }

  setLayers(layers){
    this.uiStore.setLayers(layers);
  }

  // DATE
  updateDateRange(dateRange) {
    this.uiStore.updateDateRange(dateRange);
  }
  updateStartDate(date) {
    this.uiStore.updateStartDate(date);
  }
  updateEndDate(date) {
    this.uiStore.updateEndDate(date);
  }
  updateDateRangeChart(dateRange) {
    this.uiStore.updateDateRangeChart(dateRange);
  }
  updateStartDateChart(date) {
    this.uiStore.updateStartDateChart(date);
  }
  updateEndDateChart(date) {
    this.uiStore.updateEndDateChart(date);
  }
  setSelectedDate(date){
    this.uiStore.updateSelectedDate(date);
  }

  setLanguage(lang){
    this.uiStore.setLanguage(lang);
  }
  setTheme(theme){
    this.uiStore.setTheme(theme);
  }

  updateBaseLayer(layer){
    this.uiStore.updateBaseLayer(layer);
  }
  
  toggleFilterVisible(){
    this.uiStore.update( state => ({ ...state , fitlerVisible: !state.fitlerVisible }));
  }
  setFilterVisible(filter){
    this.uiStore.update( state => ({ ...state , fitlerVisible: filter }));
  }
  setSearchTerm(searchTerm){
    this.uiStore.update( state => ({ ...state , searchTerm: searchTerm }));
  }
}
