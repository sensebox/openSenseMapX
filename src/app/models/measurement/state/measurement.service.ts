import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { MeasurementStore } from './measurement.store';
import { Measurement } from './measurement.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MeasurementService {

  constructor(private measurementStore: MeasurementStore,
              private http: HttpClient) {
  }

  get() {
    return this.http.get<Measurement[]>('https://api.com').pipe(tap(entities => {
      this.measurementStore.set(entities);
    }));
  }

  add(measurement: Measurement) {
    this.measurementStore.add(measurement);
  }

  update(id, measurement: Partial<Measurement>) {
    this.measurementStore.update(id, measurement);
  }

  remove(id: ID) {
    this.measurementStore.remove(id);
  }
}
