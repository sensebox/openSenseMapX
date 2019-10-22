import { Injectable } from '@angular/core';
import { Box } from './box.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface BoxState extends EntityState<Box> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'box', idKey: '_id' })
export class BoxStore extends EntityStore<BoxState> {

  constructor() {
    super();
  }

}

