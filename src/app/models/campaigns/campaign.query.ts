import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CampaignStore, CampaignState } from './campaign.store';

@Injectable({ providedIn: 'root' })
export class CampaignQuery extends QueryEntity<CampaignState> {


  constructor(protected store: CampaignStore) {
    super(store);
  }

}
