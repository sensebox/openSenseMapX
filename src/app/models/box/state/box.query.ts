import { Injectable } from '@angular/core';
import { QueryEntity, EntityUIQuery, combineQueries, ID } from '@datorama/akita';
import { BoxStore, BoxState, BoxUIState, BoxUI } from './box.store';
import { Box } from './box.model';
import { SensorQuery } from '../../sensor/state/sensor.query';
import { map, mergeMap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BoxQuery extends QueryEntity<BoxState> {

  ui: EntityUIQuery<BoxUIState, BoxUI>;

  selectUI$ = this.select('ui');
  // selectselectedPheno$ = this.select('ui');
  // selectDateRange$ = this.select(state => state.ui.dateRange);
  
  selectDisplayTimeSlider$ = this.select(state => state.ui.displayTimeSlider);

  // selectSelectedPheno$ = this.select(state => state.ui.selectedPheno);
  selectMapInit$ = this.select(state => state.ui.mapInit);
  selectDataInit$ = this.select(state => state.ui.dataInit);
  selectCompareTo$ = this.select(state => state.ui.compareTo);
  selectCompareModus$ = this.select(state => state.ui.compareModus);
  selectPopupBox$ = this.select(state => state.ui.popupBox);


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
            sensors: box.sensors ? box.sensors.map(sensorId => sensors[sensorId]): null
          };
        });
      })
    );
  }

  selectActiveWithUI(){
    const box = this.selectActive();
    const boxUI = this.ui.selectAll({ asObject: true });

    return combineLatest(
      box,
      boxUI
    ).pipe(map(([box, boxUI]) => {
      if(box){
        return {
          ...box,
          ...boxUI[box._id]
        }
      }
    }))
  }

  selectActiveWithSensorAndUI(){
    const box = this.selectActive();
    const boxUI = this.ui.selectAll({ asObject: true });
    const sensors = this.sensorQuery.selectAll({ asObject: true });
    console.log(boxUI);
    return combineLatest(
      box,
      boxUI,
      sensors
    ).pipe(map(([box, boxUI, sensors]) => {
      if(box){
        return {
          ...box,
          ...boxUI[box._id],
          sensors: box.sensors ? box.sensors.map(sensorId => sensors[sensorId]) : null
        }
      }
    }))
  }

  selectBoxWithSensorAndUI(id: ID){
    const box = this.select(id);
    const boxUI = this.ui.selectAll({ asObject: true });

    return combineLatest(
      box,
      boxUI,
      this.sensorQuery.selectAll({ asObject: true })
    ).pipe(map(([box, boxUI, sensors]) => {
      if(box){
        return {
          ...box,
          ...boxUI[id],
          sensors: box.sensors ? box.sensors.map(sensorId => sensors[sensorId]): null
        }
      }
    }))
  }
  selectBoxesWithSensorAndUI(id: ID[]){
    const boxes = this.selectMany(id);
    const boxUI = this.ui.selectAll({ asObject: true });
    return combineLatest(
      boxes,
      boxUI,
      this.sensorQuery.selectAll({ asObject: true })
    ).pipe(map(([boxes, boxUI, sensors]) => {
      if(boxes){
        return boxes.map(box => {
          return {
            ...box,
            ...boxUI[box._id],
            sensors: box.sensors ? box.sensors.map(sensorId => sensors[sensorId]): null
          }
        })
      }
    }))
  }


  selectActiveWithSensor(){
    return combineQueries([
      // this.selectAll(),
      this.selectActive(),
      this.sensorQuery.selectAll({ asObject: true })])
    .pipe(
      map(([box, sensors]) => {
        return {
          ...box,
          sensors: box.sensors ? box.sensors.map(sensorId => sensors[sensorId]) : null
        };
      })
    );
  }

  selectManyWithSensors(boxIds){
    boxIds = Array.isArray(boxIds) ? boxIds : [boxIds];
    
    return combineQueries([
      this.selectMany(boxIds),
      this.sensorQuery.selectAll({ asObject: true })])
    .pipe(
      map(([boxes, sensors]) => {
        return boxes.map(box => {
          return {
            ...box,
            sensors: box.sensors ? box.sensors.map(sensorId => sensors[sensorId]) : null
          };
        });
      })
    );
  }

  selectCompareToWithSensors(){
    console.log("ONCE")
    return this.selectCompareTo$.pipe(mergeMap(res => {
      if(res.length > 0){
        return this.selectManyWithSensors(res);
      } else {
        // return new Observable();
      }
    }))
  }


  constructor(protected store: BoxStore, private sensorQuery: SensorQuery) {
    super(store);
    this.createUIQuery();
  }

}
