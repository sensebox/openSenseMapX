import { Injectable } from '@angular/core';
import { UiStore } from './ui.store';
import { Ui } from './ui.model';
import { ColorHelper } from '@swimlane/ngx-charts';
import { HttpClient, HttpParams } from '@angular/common/http';
import { first, tap } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class UiService {

  LOCATIONIQ_TOKEN = environment.locationiq_token;


  constructor(
    private uiStore: UiStore, 
    private http: HttpClient) {
  }

  fetchGeocodeResults(searchstring){
    const params = new HttpParams()
      .set('format', "json")
      .set('key', this.LOCATIONIQ_TOKEN)
      .set('addressdetails', "1")
      .set('limit', "4")
      .set('q', searchstring)
 

    return this.http.get("//locationiq.org/v1/search.php", {params: params}).pipe(first()).pipe(tap((res:any) => {
      this.uiStore.update(state => ({ ...state , locationAutocompleteResults: res }))
    }));
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
  setSearchResults(results){
    this.uiStore.update( state => ({ ...state , searchResults: results }));
  }
}
