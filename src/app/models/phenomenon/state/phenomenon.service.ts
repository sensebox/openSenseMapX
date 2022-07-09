import { Injectable } from '@angular/core';
import { PhenomenonStore } from './phenomenon.store';
import { Phenomenon } from './phenomenon.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { SessionService } from '../../session/state/session.service';
// import { UiService } from '../../ui/state/ui.service';
// import { MapService } from 'src/app/modules/explore/services/map.service';
// import { BoxService } from '../../box/state/box.service';


@Injectable({ providedIn: 'root' })
export class PhenomenonService {

  constructor(
    private phenomenonStore: PhenomenonStore,
    private http: HttpClient,
) {
  }

  get() {
    return this.http.get<Phenomenon[]>(`${environment.sensor_wiki_url}/phenomena/all?format=json`).pipe(tap(entities => {
      entities = entities.map((ent: any) => {return {...ent, iri: ent.phenomenon.value}})
      this.phenomenonStore.set(entities);
    }));
  }
}