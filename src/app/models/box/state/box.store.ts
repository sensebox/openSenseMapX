import { Injectable } from '@angular/core';
import { Box } from './box.model';
import { EntityState, EntityStore, StoreConfig, ActiveState, EntityUIStore } from '@datorama/akita';

export type BoxUI = {
  isOpen: boolean;
  isLoading: boolean;
}

export interface BoxState extends EntityState<Box>, ActiveState {}
export interface BoxUIState extends EntityState<BoxUI> {}


const initialState = {
  active: null
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'box', idKey: '_id' })
export class BoxStore extends EntityStore<BoxState> {

  ui: EntityUIStore<BoxUIState>;

  constructor() {
    super(initialState);
    this.createUIStore().setInitialEntityState({ isLoading: false, isOpen: true });
  }

}

