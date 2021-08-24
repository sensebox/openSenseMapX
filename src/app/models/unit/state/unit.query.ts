import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UnitStore, UnitState } from './unit.store';

@Injectable({ providedIn: 'root' })
export class UnitQuery extends QueryEntity<UnitState> {


  constructor(protected store: UnitStore) {
    super(store);
  }

}
