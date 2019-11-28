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

  constructor(protected store: SensorStore) {
    super(store);
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
          ...sensorsUI[sensor.id]
        }
      })
    }))
  }

}
