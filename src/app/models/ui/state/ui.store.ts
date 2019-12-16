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
  selectedDate: Date
}

export function createInitialState(): UiState {
  return {
    colors: null,
    activeSensorTypes: [],
    selectedPheno: null,
    dateRange: [new Date("2019-11-05T14:00:00.000Z"), new Date("2019-11-06T14:00:00.000Z")],
    selectedDate: null,
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
      'circle-blur': 0.8,
      'circle-color': [
        'match',
        ['get', 'state'],
        'active', '#4EAF47',
        'old', '#eb5933',
        /* other */ '#ccc200'
        ]
      } 
    }]
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
    this.update( state => ( { ...state , selectedPheno: pheno, layers: [pheno.layer] }));
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
  updateSelectedDate(date){
    this.update( state => ({ ...state , selectedDate: date }));
  }
}


