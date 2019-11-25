import { Injectable } from '@angular/core';
import { Sensor } from './sensor.model';
import { EntityState, EntityStore, StoreConfig, MultiActiveState } from '@datorama/akita';

export interface SensorState extends EntityState<Sensor>, MultiActiveState {}


const initialState = {
  active: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'sensor' , idKey: '_id'})
export class SensorStore extends EntityStore<SensorState> {

  constructor() {
    super(initialState);
  }

}

