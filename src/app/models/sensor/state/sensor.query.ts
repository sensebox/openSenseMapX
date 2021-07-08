import { Injectable } from '@angular/core';
import { QueryEntity, ID, EntityUIQuery } from '@datorama/akita';
import { SensorStore, SensorState, SensorUI, SensorUIState } from './sensor.store';
import { Observable, combineLatest } from 'rxjs';
import { Sensor } from './sensor.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SensorQuery extends QueryEntity<SensorState, SensorUIState> {
  ui: EntityUIQuery<SensorUIState, SensorUI>;

  selectCachedSensors$ = this.select(state => state.cachedSensors);
  selectActiveSensorTypes$ = this.select(state => state.ui.activeSensorTypes);
  selectLoadingState$ = this.select(state => state.ownLoading);

  constructor(protected store: SensorStore) {
    super(store);
    this.createUIQuery();
  }

  selectEntityWithUI(id: ID) {
    const sensors = this.selectAll();
    const sensorsUI = this.ui.selectAll({ asObject: true });

    
    return combineLatest(
      sensors,
      sensorsUI
    ).pipe(map(([sensors, sensorsUI]) => {
      return sensors.map(sensor => {
        return {
          ...sensor,
          ...sensorsUI[sensor._id]
        }
      })
    }))
  }
  selectActiveWithUI(): any {
    // console.
  // selectActiveWithUI(): Observable<(Sensor & SensorUI)[]> {
    const sensors = this.selectActive();
    const sensorsUI = this.ui.selectAll({ asObject: true });

    return combineLatest(
      sensors,
      sensorsUI
    ).pipe(map(([sensors, sensorsUI]) => {
      return sensors.map(sensor => {
        return {
          ...sensor,
          ...sensorsUI[sensor._id]
        }
      })
    }))
  }

}
