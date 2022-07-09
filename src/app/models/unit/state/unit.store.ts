import { Injectable } from '@angular/core';
import { Unit } from './unit.model';
import { EntityState, EntityStore, StoreConfig, MultiActiveState, EntityUIStore } from '@datorama/akita';

export interface UnitState extends EntityState<Unit>, MultiActiveState {}


const initialState = {
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Unit' , idKey: 'iri'})
export class UnitStore extends EntityStore<UnitState> {

  constructor() {
    super(initialState);
  }
}