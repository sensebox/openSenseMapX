import { Injectable } from '@angular/core';
import { Sensor } from './sensor.model';
import { EntityState, EntityStore, StoreConfig, MultiActiveState, EntityUIStore } from '@datorama/akita';
import { state } from '@angular/animations';
import { TouchSequence } from 'selenium-webdriver';

export interface SensorState extends EntityState<Sensor>, MultiActiveState {}

export type SensorUI = {
  hasData: boolean;
  isLoading: boolean;
}

export interface SensorUIState extends EntityState<SensorUI> {}


const initialState = {
  active: [],
  cachedSensors: [],
  ui: {
    activeSensorTypes: []
  }
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'sensor' , idKey: '_id'})
export class SensorStore extends EntityStore<SensorState> {

  ui: EntityUIStore<SensorUIState>;

  constructor() {
    super(initialState);
    this.createUIStore().setInitialEntityState({hasData: false, isLoading: false});
  }

  addCached(sensor){
    this.update( state => ({...state, cachedSensors: [...state.cachedSensors, sensor]}));
  }

  resetCached(){
    this.update( state => ({...state, cachedSensors: []}));
  }

  // toggleSelectedSensorTypes(type){
  //   this.update( state => {
  //     if(state.ui.selectedSensorTypes.indexOf(type) === -1){
  //       return { ui: {...state.ui, selectedSensorTypes: [...state.ui.selectedSensorTypes, type ]}}
  //     } else {
  //       let newSelectedSensorTypes = [...state.ui.selectedSensorTypes.slice(0, state.ui.selectedSensorTypes.indexOf(type)), ...state.ui.selectedSensorTypes.slice(state.ui.selectedSensorTypes.indexOf(type)+1)];
  //       return { ui: {...state.ui, selectedSensorTypes: newSelectedSensorTypes}}
  //     }
  //   })
  // }

  // setSelectedSensorTypes(type) {
  //   this.update ( state => ({ ui: {...state.ui, activeSensorTypes: [type]}}));
  // }
  setActiveSensorTypes(type) {
    // type = [...type];
    this.update ( state => ({ ui: {...state.ui, activeSensorTypes: type}}));
  }

  // setActiveMax(data) {
  //   this.active
  // }


  // akitaPreUpdateEntity(prevSensor: any, nextSensor: any){
  //   console.log('ENTITY UPDATE', prevSensor);
  //   // console.log(this._value().active);
  //   // console.log(this.active)
  //   console.log('ENTITY UPDATE', nextSensor);
  //   return nextSensor;
  //   // console.log('ENTITY UPDATE', nextSensor);
  // }

}


