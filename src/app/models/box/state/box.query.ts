import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BoxStore, BoxState } from './box.store';

@Injectable({ providedIn: 'root' })
export class BoxQuery extends QueryEntity<BoxState> {

  constructor(protected store: BoxStore) {
    super(store);
  }

}
