import { Injectable } from '@angular/core';
import { Device } from './device.model';
import { EntityState, EntityStore, StoreConfig, MultiActiveState, EntityUIStore } from '@datorama/akita';

export interface DeviceState extends EntityState<Device>, MultiActiveState {}


const initialState = {
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Device' , idKey: "label"})
export class DeviceStore extends EntityStore<DeviceState> {


  constructor() {
    super(initialState);
  }
}