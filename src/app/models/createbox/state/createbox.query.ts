import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { CreateboxStore, CreateboxState } from './createbox.store';

@Injectable({ providedIn: 'root' })
export class CreateboxQuery extends Query<CreateboxState> {

  selectSelectedDevice$ = this.select(state => state.selectedDevice);
  selectSelectedSensors$ = this.select(state => state.selectedSensors);
  selectSelectedSensorElements$ = this.select(state => state.selectedSensorElements);

  constructor(protected store: CreateboxStore) {
    super(store);
  }

}
