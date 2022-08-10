import { Injectable } from "@angular/core";
import { PhenomenonStore } from "./phenomenon.store";
import { Phenomenon } from "./phenomenon.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
// import { SessionService } from '../../session/state/session.service';
// import { UiService } from '../../ui/state/ui.service';
// import { MapService } from 'src/app/modules/explore/services/map.service';
// import { BoxService } from '../../box/state/box.service';

@Injectable({ providedIn: "root" })
export class PhenomenonService {
  constructor(
    private phenomenonStore: PhenomenonStore,
    private http: HttpClient
  ) {}

  get() {
    return this.http
      .get<Phenomenon[]>(
        `${environment.sensor_wiki_url}/phenomena/all?language=de`
      )
      .pipe(
        tap((entities) => {
          console.log(entities);
          entities = entities.map((ent: any) => {
            return { ...ent, label: ent.label.item[0].text, rov: ent.rov ? ent.rov : [] };
          });
          this.phenomenonStore.set(entities);
        })
      );
  }
}
