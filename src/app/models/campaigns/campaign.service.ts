import { Injectable } from '@angular/core';
import { CampaignStore } from './campaign.store';
import { Campaign } from './campaign.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class CampaignService {

  constructor(
    private campaignStore: CampaignStore,
    private http: HttpClient,
) {
  }

  get() {
    return this.http.get<Campaign[]>(`${environment.sensor_wiki_url}/phenomena/all?format=json`).pipe(tap(entities => {
      entities = entities.map((ent: any) => {return {...ent, iri: ent.Campaign.value}})
      this.campaignStore.set(entities);
    }));
  }
}