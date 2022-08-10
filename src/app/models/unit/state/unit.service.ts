import { Injectable } from '@angular/core';
import { UnitStore } from './unit.store';
import { Unit } from './unit.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class UnitService {

  constructor(
    private unitStore: UnitStore,
    private http: HttpClient,
) {
  }

  get() {
    return this.http.get<Unit[]>(`${environment.sensor_wiki_url}/units`).pipe(tap(entities => {
      console.log(entities);
      let mappedEntities = entities.map((ent:any) => {return {id: ent.id, label: ent.name}})
      this.unitStore.set(mappedEntities);
    }));
  }
}