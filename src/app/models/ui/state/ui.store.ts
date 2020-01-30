import { Injectable } from '@angular/core';
import { Ui } from './ui.model';
import { StoreConfig, Store } from '@datorama/akita';
import { ColorHelper } from '@swimlane/ngx-charts';

export interface UiState {
  colors: ColorHelper,
  activeSensorTypes: any[],
  selectedPheno: any,
  layers: any[],
  dateRange: Array<Date>,
  dateRangeChart: Array<Date>,
  selectedDate: Date,
  language: string,
  theme: string,
  baseLayer: any,
  fitlerVisible: boolean,
  searchTerm: string
}

export function createInitialState(): UiState {
  return {
    colors: null,
    activeSensorTypes: [],
    selectedPheno: null,
    dateRange: null,
    dateRangeChart: [new Date("2020-01-19T14:00:00.000Z"), new Date("2020-01-20T14:00:00.000Z")],
    selectedDate: null,
    language: 'de',
    theme: 'light',
    baseLayer: {
      'id': 'base-layer',
      'type': 'circle',
      'source': 'boxes',
      'filter': ["!=", 'old', ["get", "state"]],
      'paint': {
      'circle-radius': {
        'base': 1.75,
        'stops': [[1, 2], [22, 3080]]
      },
      'circle-stroke-width': 1,
      'circle-stroke-color': '#383838',
      
      // 'circle-blur': 0.8,
      'circle-color': [
        'match',
        ['get', 'state'],
        'active', '#4EAF47',
        'old', '#eb5933',
        /* other */ '#ccc200'
        ]
      }
    },
    layers: [{
      'id': 'base-layer',
      'type': 'circle',
      'source': 'boxes',
      'filter': ["!=", 'old', ["get", "state"]],
      'paint': {
      'circle-radius': {
        'base': 1.75,
        'stops': [[1, 2], [22, 3080]]
      },
      'circle-stroke-width': 1,
      'circle-stroke-color': '#383838',
      
      // 'circle-blur': 0.8,
      'circle-color': [
        'match',
        ['get', 'state'],
        'active', '#4EAF47',
        'old', '#eb5933',
        /* other */ '#ccc200'
        ]
      } 
    }],
    fitlerVisible: true,
    searchTerm: ""
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ui' })
export class UiStore extends Store<UiState> {

  constructor() {
    super(createInitialState());
  }

  setActiveSensorTypes(types){
    this.update( state => ({...state, activeSensorTypes: types}));
  }
  updateSelectedPheno(pheno) {
    this.update( state => ( {
       ...state, 
       selectedPheno: pheno, 
       baseLayer: {
        ...state.baseLayer,
        filter: pheno.layer.filter,
        paint: {
          ...state.baseLayer.paint,
          'circle-color': pheno.layer.paint['circle-color'],
          'circle-radius': pheno.layer.paint['circle-radius']
        },
      }
    }));
  }
  setLayers(layers){
    this.update( state => ( { ...state , layers: layers }));
  }

  updateDateRange(dateRange: Array<Date>) {
    this.update( state => ({ ...state ,dateRange: dateRange}) );
  }
  updateStartDate(startDate: Date) {
    this.update( state => ({ ...state ,dateRange: [startDate, state.dateRange[1] ? state.dateRange[1] : null]} ) );
  }
  updateEndDate(endDate: Date) {
    this.update( state => ({ ...state ,dateRange: [state.dateRange[0] ? state.dateRange[0] : null , endDate]}) );
  }
  updateDateRangeChart(dateRange: Array<Date>) {
    this.update( state => ({ ...state ,dateRangeChart: dateRange}) );
  }
  updateStartDateChart(startDate: Date) {
    this.update( state => ({ ...state ,dateRangeChart: [startDate, state.dateRangeChart[1] ? state.dateRangeChart[1] : null]} ) );
  }
  updateEndDateChart(endDate: Date) {
    this.update( state => ({ ...state ,dateRangeChart: [state.dateRangeChart[0] ? state.dateRangeChart[0] : null , endDate]}) );
  }
  updateSelectedDate(date){
    this.update( state => ({ ...state , selectedDate: date }));
  }
  setLanguage(lang){
    this.update( state => ({ ...state , language: lang }));
  }
  setTheme(theme){
    this.update( state => ({ ...state , theme: theme }));
  }

  updateBaseLayer(layer){
    this.update( state => ( {
      baseLayer: {
        ...state.baseLayer,
        filter: layer.filter ? layer.filter : state.baseLayer.filter,
        paint: {
          ...state.baseLayer.paint,
          'circle-stroke-width': layer.paint['circle-stroke-width'] ? layer.paint['circle-stroke-width'] : state.baseLayer.paint['circle-stroke-width'],
          'circle-blur': layer.paint['circle-blur'] != undefined ? layer.paint['circle-blur'] : state.baseLayer.paint['circle-blur'],
          'circle-color': layer.paint['circle-color'] ? layer.paint['circle-color'] : state.baseLayer.paint['circle-color'],
          'circle-radius': layer.paint['circle-radius']
        },
      }
    }))
  }
}


