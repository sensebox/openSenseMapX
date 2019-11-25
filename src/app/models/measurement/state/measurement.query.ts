import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { MeasurementStore, MeasurementState } from './measurement.store';

@Injectable({ providedIn: 'root' })
export class MeasurementQuery extends QueryEntity<MeasurementState> {

  constructor(protected store: MeasurementStore) {
    super(store);
  }

}
