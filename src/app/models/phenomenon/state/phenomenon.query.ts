import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PhenomenonStore, PhenomenonState } from './phenomenon.store';

@Injectable({ providedIn: 'root' })
export class PhenomenonQuery extends QueryEntity<PhenomenonState> {


  constructor(protected store: PhenomenonStore) {
    super(store);
  }

}
