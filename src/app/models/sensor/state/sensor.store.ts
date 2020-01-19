import { Injectable } from '@angular/core';
import { Sensor } from './sensor.model';
import { EntityState, EntityStore, StoreConfig, MultiActiveState, EntityUIStore } from '@datorama/akita';

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

  setActiveSensorTypes(type) {
    this.update ( state => ({ ui: {...state.ui, activeSensorTypes: type}}));
  }

}