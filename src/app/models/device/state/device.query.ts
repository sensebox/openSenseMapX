import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { DeviceStore, DeviceState } from './device.store';

@Injectable({ providedIn: 'root' })
export class DeviceQuery extends QueryEntity<DeviceState> {

  constructor(protected store: DeviceStore) {
    super(store);
  }

}
