import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { BoxStore } from './box.store';
import { Box } from './box.model';
import { tap, share } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';

import { schema, normalize } from 'normalizr';
import { MeasurementStore } from '../../measurement/state/measurement.store';
import { SensorStore } from '../../sensor/state/sensor.store';
import { UiService } from '../../ui/state/ui.service';

@Injectable({ providedIn: 'root' })
export class BoxService {

  constructor(
    private boxStore: BoxStore, 
    private sensorStore: SensorStore, 
    private uiService: UiService,
    private http: HttpClient) {
  }

  get() {
    
    // Normalizr-Schema for the Data 
    const sensor = new schema.Entity('sensors', {}, { idAttribute: '_id' });
    const box = new schema.Entity('boxes', {sensors: [sensor] }, { idAttribute: '_id' });


    return this.http.get<Box[]>(`${environment.api_url}/boxes?classify=true&bbox=13.0882097323,52.3418234221,13.7606105539,52.6697240587&full=true`).pipe(tap(entities => {
      
      //normalize Data 
      let res  = normalize(entities, [box]);

      //set Data in storess
      this.boxStore.set(res.entities.boxes);

      //TODO: find better way than this
      for (let box in res.entities.boxes) {
        res.entities.boxes[box].sensors.forEach(sensor => {
          res.entities.sensors[sensor].boxes_id = res.entities.boxes[box]._id;
        })
      }
      this.sensorStore.set(res.entities.sensors);
    }));
  }

  // getValue(pheno) {
  //   return this.http.get<any[]>(`https://api.opensensemap.org/boxes/data?&phenomenon=${pheno}&bbox=13.0882097323,52.3418234221,13.7606105539,52.6697240587&format=json&columns=boxId`).pipe(tap(entities => {
  //     entities = entities.map(ent => {
  //       return {
  //         _id: ent.boxId,
  //         [pheno]: ent.value
  //       }
  //     })
  //     console.log(entities);
  //     this.boxStore.upsertMany(entities);
  //   })); 
  // }
  getValues(pheno, dateRange) {
    return this.http.get<any[]>(`${environment.api_url}/statistics/descriptive?&phenomenon=${pheno}&bbox=13.0882097323,52.3418234221,13.7606105539,52.6697240587&format=json&columns=boxId&from-date=${dateRange[0].toISOString()}&to-date=${dateRange[1].toISOString()}&window=3600000&operation=arithmeticMean`).pipe(tap(entities => {
      entities = entities.map(ent => {
        let { boxId, sensorId, ...noEnt} = ent;
        // console.log(noEnt);
        //TODO: find better place for vconverting to 2 decimal-diggits
        Object.keys(noEnt).forEach(key => {if(noEnt[key]) { noEnt[key] = Math.round( noEnt[key] * 1e2 ) / 1e2 } })
        return {
          _id: ent.boxId,
          values: {
            [pheno]: noEnt 
          }
        }
      })
      
      //TODO: find a better place for this
      this.setDisplayTimeSlider(true);
      this.uiService.setSelectedDate(dateRange[0]);

      this.boxStore.upsertMany(entities);
    }), share());
  }

  getSingleBox(id){
    const sensor = new schema.Entity('sensors', {}, { idAttribute: '_id' });

    const box = new schema.Entity('boxes', {sensors: [sensor] }, { idAttribute: '_id' });

    return this.http.get<Box>(`${environment.api_url}/boxes/${id}`).pipe(tap(entity => {
      // console.log(entity);
      // console.log(normalize([entity], [box]))
      let entities: any = normalize([entity], [box]);
      this.boxStore.upsert(entities.entities.boxes[entity._id], entities.entities.boxes);
      this.sensorStore.upsertMany(Object.values(entities.entities.sensors));
    }));
  }

  // getSingleBoxValues(boxId, sensorId, fromDate, toDate){
  //   // https://api.opensensemap.org/boxes/5aec1cb5223bd80019cdcadf/data/5aec1cb5223bd80019cdcae3?to-date=2019-11-12T15:54:08.775Z
  //   return this.http.get<any[]>(`${environment.api_url}/boxes/${boxId}/data/${sensorId}?from-date=${fromDate}&to-date=${toDate}`).pipe(tap(data => {
  //     let mapData = data.map(item => {return {name: new Date(item.createdAt), value: item.value}})
  //     let upsert = {
  //       _id: boxId,
  //       values: {
  //         [sensorId]: mapData
  //       }
  //     }
  //     this.boxStore.upsert(boxId, upsert);
  //   }));
  // }

  add(box: Box) {
    this.boxStore.add(box);
  }

  setActive(id) {
    this.boxStore.setActive(id);
  }

  update(id, box: Partial<Box>) {
    this.boxStore.update(id, box);
  }

  remove(id: ID) {
    this.boxStore.remove(id);
  }

  setDisplayTimeSlider(display: boolean){
    this.boxStore.updateDisplayTimeSlider(display);
  }

  setMapInit(mapInit){
    this.boxStore.setMapInit(mapInit);
  }
  setDataInit(dataInit){
    this.boxStore.setDataInit(dataInit);
  }

  setCompareModus(modus){
    this.boxStore.setCompareModus(modus);
  }

  toggleCompareTo(box){
    this.boxStore.toggleCompareTo(box);
  }
  resetCompareTo(){
    this.boxStore.resetCompareTo();
  }

  setCompareTo(compareTo){
    this.boxStore.setCompareTo(compareTo);
  }

  setPopupBox(box){
    this.boxStore.setPopupBox(box);
  }
}
