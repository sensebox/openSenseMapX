import { Injectable } from '@angular/core';
import { Phenomenon } from './phenomenon.model';
import { EntityState, EntityStore, StoreConfig, MultiActiveState, EntityUIStore } from '@datorama/akita';

export interface PhenomenonState extends EntityState<Phenomenon>, MultiActiveState {}


const initialState = {
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Phenomenon' , idKey: 'iri'})
export class PhenomenonStore extends EntityStore<PhenomenonState> {

  constructor() {
    super(initialState);
  }
}