import { Injectable } from '@angular/core';
import { Measurement } from './measurement.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface MeasurementState extends EntityState<Measurement> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'measurement' })
export class MeasurementStore extends EntityStore<MeasurementState> {

  constructor() {
    super();
  }

}

