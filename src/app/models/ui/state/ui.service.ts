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

  clusterTimeout;


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
  updateDateStamp(date) {
    this.uiStore.updateDateStamp(date);
  }
  updateDateRange(dateRange) {
    this.uiStore.updateDateRange(dateRange);
  }
  updateStartDate(date) {
    this.uiStore.updateStartDate(date);
  }
  updateEndDate(date) {
    this.uiStore.updateEndDate(date);
  }
  setDateRangeChart(dateRange) {
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
  updateActiveTimeMode(mode){
    this.uiStore.update( state => ({ ...state , activeTimeMode: mode }));
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
  setClustering(clustering){
    this.uiStore.update( state => (
      {...state, baseLayer: 
          {
            ...state.baseLayer, 
            layout: 
              {...state.baseLayer.layout, 
                visibility: clustering ? 'none' : 'visible'}}}));
    this.uiStore.update( state => (
      {...state, clusterLayers: [
        {...state.clusterLayers[0], layout: 
          {...state.baseLayer.layout, 
            visibility: clustering && !state.selectedDate ? 'visible' : 'none'}},
            {...state.clusterLayers[1], layout: 
              {...state.baseLayer.layout, 
                visibility: clustering && !state.selectedDate ? 'visible' : 'none'}}
    
      ]} ));
 
    this.uiStore.update( state => ({ ...state , clustering: clustering }));
  }
  toggleClustering(){
    this.uiStore.update( state => (
      {...state, baseLayer: 
          {
            ...state.baseLayer, 
            layout: 
              {...state.baseLayer.layout, 
                visibility: state.clustering ? 'none' : 'visible'}}}));

    
    this.uiStore.update( state => (
      {...state, clusterLayers: [
        {...state.clusterLayers[0], layout: 
          {...state.baseLayer.layout, 
            visibility: !state.clustering && !state.selectedDate ? 'visible' : 'none'}},
            {...state.clusterLayers[1], layout: 
              {...state.baseLayer.layout, 
                visibility: !state.clustering && !state.selectedDate ? 'visible' : 'none'}}
    
      ]}
    ));

    this.uiStore.update( state => ({ ...state , clustering: !state.clustering }));
  }
  toggleCircles(){
    this.uiStore.update( state => ({ ...state , circles: !state.circles }));
  }
  toggleNumbers(){
    this.uiStore.update( state => ({ ...state , numbers: !state.numbers }));
  }
  setCluster(cluster){
    if(!cluster){
      this.clusterTimeout = setTimeout(() => {
        this.uiStore.update( state => ({ ...state , cluster: cluster }));
      },250)
    } else {
      clearTimeout(this.clusterTimeout);
      this.uiStore.update( state => ({ ...state , cluster: cluster }));
    }
  }

  setInfoPheno(infoPheno){
    this.uiStore.update( state => ({ ...state, infoPheno: infoPheno}));
  }
  setFilters(filters){
    this.uiStore.update( state => ({...state, filters: filters}))
  }
  setReloadMapData(mapData){
    this.uiStore.update( state => ({...state, reloadMapData: mapData}))
  }
  setMapLoading(mapLoading){
    this.uiStore.update( state => ({ ...state , mapLoading: mapLoading }));
  }
  setShowDateModal(showDateModal){
    this.uiStore.update( state => ({ ...state , showDateModal: showDateModal }));
  }

  updateLegend(steps){
    this.uiStore.updateLegend(steps);
  }

  setFilterIds(ids){
    this.uiStore.update( state => ({ ...state, filters: {...state.filters, ids: ids}}))
  }

  // hideBaseLayers() {
  //   console.log("hide baselayer")
  //   this.uiStore.update(state => (
  //     {
  //       ...state, baseLayer:
  //       {
  //         ...state.baseLayer,
  //         layout:
  //         {
  //           ...state.baseLayer.layout,
  //           visibility: 'none'
  //         }
  //       }
  //     }));

  //   this.uiStore.update(state => (
  //     {
  //       ...state, clusterLayers: [
  //         {
  //           ...state.clusterLayers[0], layout:
  //           {
  //             ...state.clusterLayers[0].layout,
  //             visibility: 'none'
  //           }
  //         },
  //         {
  //           ...state.clusterLayers[1], layout:
  //           {
  //             ...state.clusterLayers[1].layout,
  //             visibility: 'none'
  //           }
  //         }

  //       ]
  //     }
  //   ));
  // }
}
