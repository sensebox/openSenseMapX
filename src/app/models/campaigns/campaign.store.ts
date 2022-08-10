import { Injectable } from '@angular/core';
import { Campaign } from './campaign.model';
import { EntityState, EntityStore, StoreConfig, MultiActiveState, EntityUIStore } from '@datorama/akita';

export interface CampaignState extends EntityState<Campaign>, MultiActiveState {}


const initialState = {
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Campaign' , idKey: '_id'})
export class CampaignStore extends EntityStore<CampaignState> {

  constructor() {
    super(initialState);
  }
}