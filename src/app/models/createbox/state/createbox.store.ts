import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import { Device } from '../../device/state/device.model';

export interface CreateboxState {
  selectedDevice: Device,
  exposure: string,
  name: string,
  location: Number[]

}

export function createInitialState(): CreateboxState {
  return {
    selectedDevice: null,
    exposure: null,
    name: null,
    location: [null, null]
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'createbox' })
export class CreateboxStore extends Store<CreateboxState> {

  constructor() {
    super(createInitialState());
  }
}


