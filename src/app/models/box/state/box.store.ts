import { Injectable } from '@angular/core';
import { Box } from './box.model';
import { EntityState, EntityStore, StoreConfig, ActiveState, EntityUIStore } from '@datorama/akita';

export type BoxUI = {
  isOpen: boolean;
  isLoading: boolean;
}

export interface BoxState extends EntityState<Box>, ActiveState {
  ui: {
    compareTo;
    layers: any[];
    sourceData: any;
    dateRange: Array<Date>;
    selectedDate: any;
    selectedPheno: any;
    displayTimeSlider: boolean;
    mapInit: boolean;
    dataInit: boolean;
    compareModus: boolean;
  }
}
export interface BoxUIState extends EntityState<BoxUI> {}


const initialState = {
  ui: {
    compareTo: [],
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
    }],
    sourceData: null,
    dateRange: null,
    selectedDate: null,
    selectedPheno: null,
    displayTimeSlider: null,
    mapInit: false,
    dataInit: false,
    compareModus: false
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'box', idKey: '_id' })
export class BoxStore extends EntityStore<BoxState> {

  ui: EntityUIStore<BoxUIState>;

  constructor() {
    super(initialState);
    this.createUIStore().setInitialEntityState({ isLoading: false, isOpen: false });
  }

  updateDateRange(dateRange: Array<Date>) {
    this.update( state => ({ ui: { ...state.ui ,dateRange: dateRange} }) );
  }
  updateStartDate(startDate: Date) {
    this.update( state => ({ ui: { ...state.ui ,dateRange: [startDate, state.ui.dateRange[1] ? state.ui.dateRange[1] : null]} }) );
  }
  updateEndDate(endDate: Date) {
    this.update( state => ({ ui: { ...state.ui ,dateRange: [state.ui.dateRange[0] ? state.ui.dateRange[0] : null , endDate]} }) );
  }
  updateSelectedPheno(pheno) {
    this.update( state => ({ ui: { ...state.ui , selectedPheno: pheno, layers: [pheno.layer] }}));
  }
  updateDisplayTimeSlider(display) {
    this.update( state => ({ ui: { ...state.ui , displayTimeSlider: display }}));
  }
  updateSelectedDate(date){
    this.update( state => ({ ui: { ...state.ui , selectedDate: date }}));
  }
  setLayers(layers){
    this.update( state => ({ ui: { ...state.ui , layers: layers }}));
  }
  setMapInit(mapInit){
    this.update( state => ({ ui: { ...state.ui , mapInit: mapInit }}));
  }
  setDataInit(dataInit){
    this.update( state => ({ ui: { ...state.ui , dataInit: dataInit }}));
  }
  addCompareTo(box){
    this.update( state => ({ ui: { ...state.ui ,compareTo: [...state.compareTo, box]}}));
  }
  resetCompareTo(){
    this.update( state => ({  ui: { ...state.ui ,compareTo: []}}));
  }
  removeCompareTo(box){
    this.update( state => {
      let newCompareTo = state.ui.compareTo.slice(1, state.ui.compareTo.indexOf(box))
      return {  ui: { ...state.ui ,compareTo: newCompareTo }};

    });
  }

  setCompareModus(compare){
    this.update( state => ({ui: {...state.ui, compareModus: compare}}))
  }

  toggleCompareTo(box){
    this.update( state => {
      box = state.entities[box]
      if(state.ui.compareTo.indexOf(box) === -1){
        return { ui: {...state.ui, compareTo: [...state.ui.compareTo, box ]}}
      } else {
        let newCompareTo = [...state.ui.compareTo.slice(0, state.ui.compareTo.indexOf(box)), ...state.ui.compareTo.slice(state.ui.compareTo.indexOf(box)+1)];
        console.log(state.ui.compareTo)
        console.log(newCompareTo)
        return { ui: {...state.ui, compareTo: newCompareTo}}
      }
    })
  }
}
