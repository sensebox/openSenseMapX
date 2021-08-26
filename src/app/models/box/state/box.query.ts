import { Injectable } from '@angular/core';
import { QueryEntity, EntityUIQuery, combineQueries, ID } from '@datorama/akita';
import { BoxStore, BoxState, BoxUIState, BoxUI } from './box.store';
import { Box } from './box.model';
import { SensorQuery } from '../../sensor/state/sensor.query';
import { map, mergeMap, merge } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BoxQuery extends QueryEntity<BoxState> {

  ui: EntityUIQuery<BoxUIState, BoxUI>;

  selectUI$ = this.select('ui');  
  selectDisplayTimeSlider$ = this.select(state => state.ui.displayTimeSlider);
  selectMapInit$ = this.select(state => state.ui.mapInit);
  selectDataInit$ = this.select(state => state.ui.dataInit);
  selectCompareTo$ = this.select(state => state.ui.compareTo);
  selectCompareModus$ = this.select(state => state.ui.compareModus);
  selectPopupBox$ = this.select(state => state.ui.popupBox);
  selectDateRangeData$ = this.select(state => state.ui.dateRangeData);
  selectDataFetched$ = this.select(state => state.ui.dataFetched);
  selectFetchingData$ = this.select(state => state.ui.fetchingData);

  selectBoxes(){
    return combineQueries([
      this.selectAll(),
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
  selectEntityWithSensor(id){
    return combineQueries([
      this.selectEntity(id),
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
    return combineQueries([
      this.selectCompareTo$,
      this.selectAll({ asObject: true }),
      this.sensorQuery.selectAll({ asObject: true })])
    .pipe(
      map(([ids, boxes, sensors]) => {
        if(Object.keys(boxes).length > 0) {
          return ids.filter(id => boxes[id]).map(id => {
            if(boxes[id]){
              return {
                ...boxes[id],
                sensors: boxes[id].sensors ? boxes[id].sensors.map(sensorId => sensors[sensorId]) : null
              };
            }
          });
        }
      })
    );
   }

   selectSearchResultsWithSensors(value){

    return combineQueries([
      this.selectAll({
        filterBy: entity => entity.name.toLowerCase().includes(value.toLowerCase())
      }),
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


  constructor(protected store: BoxStore, private sensorQuery: SensorQuery) {
    super(store);
    this.createUIQuery();
  }

  search(term){
    return this.selectAll({ asObject: true});
  }

}
