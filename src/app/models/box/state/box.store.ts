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
    sourceData: any;
    displayTimeSlider: boolean;
    mapInit: boolean;
    dataInit: boolean;
    compareModus: boolean;
    popupBox: Box;
  }
}
export interface BoxUIState extends EntityState<BoxUI> {}


const initialState = {
  ui: {
    compareTo: [],
    sourceData: null,
    dateRange: null,
    selectedPheno: null,
    displayTimeSlider: null,
    mapInit: false,
    dataInit: false,
    compareModus: false,
    popupBox: null
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

  updateDisplayTimeSlider(display) {
    this.update( state => ({ ui: { ...state.ui , displayTimeSlider: display }}));
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
  setCompareTo(compareTo){
    this.update( state => ({  ui: { ...state.ui ,compareTo: compareTo}}));
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
      if(state.ui.compareTo.indexOf(box) === -1){
        return { ui: {...state.ui, compareTo: [...state.ui.compareTo, box ]}}
      } else {
        let newCompareTo = [...state.ui.compareTo.slice(0, state.ui.compareTo.indexOf(box)), ...state.ui.compareTo.slice(state.ui.compareTo.indexOf(box)+1)];
        return { ui: {...state.ui, compareTo: newCompareTo}}
      }
    })
  }

  setPopupBox(box){
    this.update( state => ({ ui: { ...state.ui , popupBox: box }}));
  }
}
