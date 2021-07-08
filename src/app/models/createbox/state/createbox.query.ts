import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { CreateboxStore, CreateboxState } from './createbox.store';

@Injectable({ providedIn: 'root' })
export class CreateboxQuery extends Query<CreateboxState> {

  selectSelectedDevice$ = this.select(state => state.selectedDevice)

  constructor(protected store: CreateboxStore) {
    super(store);
  }

}
