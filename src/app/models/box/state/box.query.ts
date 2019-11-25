import { Injectable } from '@angular/core';
import { QueryEntity, EntityUIQuery, combineQueries } from '@datorama/akita';
import { BoxStore, BoxState, BoxUIState, BoxUI } from './box.store';
import { Box } from './box.model';
import { SensorQuery } from '../../sensor/state/sensor.query';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BoxQuery extends QueryEntity<BoxState> {

  ui: EntityUIQuery<BoxUIState, BoxUI>;

  selectUI$ = this.select('ui');
  // selectselectedPheno$ = this.select('ui');
  selectDateRange$ = this.select(state => state.ui.dateRange);
  selectSelectedDate$ = this.select(state => state.ui.selectedDate);
  
  selectDisplayTimeSlider$ = this.select(state => state.ui.displayTimeSlider);

  selectSelectedPheno$ = this.select(state => state.ui.selectedPheno);
  selectMapInit$ = this.select(state => state.ui.mapInit);
  selectDataInit$ = this.select(state => state.ui.dataInit);


  // get ui() {
  //   return this.getValue().ui;
  // }

  selectBoxes(){
    return combineQueries([
      this.selectAll(),
      // this.selectActive()
      this.sensorQuery.selectAll({ asObject: true })])
    .pipe(
      map(([boxes, sensors]) => {
        return boxes.map(box => {
          return {
            ...box,
            sensors: box.sensors.map(sensorId => sensors[sensorId])
          };
        });
      })
    );
  }

  constructor(protected store: BoxStore, private sensorQuery: SensorQuery) {
    super(store);
    this.createUIQuery();
  }

}
