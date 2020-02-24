import { Injectable } from '@angular/core';
import { Vis } from './vis.model';
import { EntityState, EntityStore, StoreConfig, MultiActiveState, EntityUIStore } from '@datorama/akita';

export interface VisState extends EntityState<Vis>, MultiActiveState {}


const initialState = {
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Vis' , idKey: '_id'})
export class VisStore extends EntityStore<VisState> {


  constructor() {
    super(initialState);
  }
}