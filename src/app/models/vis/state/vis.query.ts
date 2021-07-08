import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { VisStore, VisState } from './vis.store';

@Injectable({ providedIn: 'root' })
export class VisQuery extends QueryEntity<VisState> {

  constructor(protected store: VisStore) {
    super(store);
  }

}
