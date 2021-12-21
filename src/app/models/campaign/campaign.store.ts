import { Injectable } from "@angular/core";
import { EntityStore, EntityState, StoreConfig, MultiActiveState } from "@datorama/akita";
import { Campaign } from './campaign.model'; 

export interface CampaignState extends EntityState<Campaign>, MultiActiveState{}

const initialState = {
    
};

@Injectable({ providedIn: 'root'})
@StoreConfig({name: 'Campaign', idKey: '_id'})
export class CampaignStore extends EntityStore<Campaign>{

    constructor(){
        super(initialState);
    }
}
