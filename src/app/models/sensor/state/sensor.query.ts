import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SensorStore, SensorState } from './sensor.store';

@Injectable({ providedIn: 'root' })
export class SensorQuery extends QueryEntity<SensorState> {

  constructor(protected store: SensorStore) {
    super(store);
  }

}
