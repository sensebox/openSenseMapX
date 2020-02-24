import { Injectable } from '@angular/core';
import { VisStore } from './vis.store';
import { Vis } from './vis.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class VisService {

  constructor(
    private visStore: VisStore,
    private http: HttpClient) {
  }

  get() {
    return this.http.get<Vis[]>(`/assets/data/vis.json`).pipe(tap(entities => {
      this.visStore.set(entities);
    }));   
  }
}