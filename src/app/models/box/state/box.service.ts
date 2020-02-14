import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { BoxStore } from './box.store';
import { Box } from './box.model';
import { tap, share } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';

import { schema, normalize } from 'normalizr';
import { SensorStore } from '../../sensor/state/sensor.store';
import { UiService } from '../../ui/state/ui.service';
import { BoxQuery } from './box.query';

@Injectable({ providedIn: 'root' })
export class BoxService {

  constructor(
    private boxStore: BoxStore, 
    private sensorStore: SensorStore, 
    private boxQuery: BoxQuery, 
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

      //TODO: find better way than this (reference from sensor to box)
      for (let box in res.entities.boxes) {
        res.entities.boxes[box].sensors.forEach(sensor => {
          res.entities.sensors[sensor].boxes_id = res.entities.boxes[box]._id;
          res.entities.sensors[sensor].boxes_name = res.entities.boxes[box].name;
        })
      }
      this.sensorStore.set(res.entities.sensors);
    }));
  }

  getValues(pheno, dateRange) {
    
    this.boxStore.setLoading(true);

    return this.http.get<any[]>(`${environment.api_url}/statistics/descriptive?&phenomenon=${pheno}&bbox=13.0882097323,52.3418234221,13.7606105539,52.6697240587&format=json&columns=boxId&from-date=${dateRange[0].toISOString()}&to-date=${dateRange[1].toISOString()}&window=3600000&operation=arithmeticMean`).pipe(tap(entities => {
      entities = entities.map(ent => {
        let { boxId, sensorId, ...noEnt} = ent;
        //TODO: find better place for vconverting to 2 decimal-diggits
        Object.keys(noEnt).forEach(key => {if(noEnt[key]) { noEnt[key] = Math.round( noEnt[key] * 1e2 ) / 1e2 } })
        return {
          _id: ent.boxId,
          values: {
            [pheno]: noEnt 
          }
        }
      })
      
      this.boxStore.upsertMany(entities);
      this.boxStore.setLoading(false);
      //TODO: find a better place for this + fix calling twice :o
      // this.setDisplayTimeSlider(true);
      this.uiService.setSelectedDate(dateRange[0]);
      this.uiService.setSelectedDate(dateRange[0]);
    }), share());
  }

  getSingleBox(id){
    const sensor = new schema.Entity('sensors', {}, { idAttribute: '_id' });

    const box = new schema.Entity('boxes', {sensors: [sensor] }, { idAttribute: '_id' });

    return this.http.get<Box>(`${environment.api_url}/boxes/${id}`).pipe(tap(entity => {
      let entities: any = normalize([entity], [box]);
      this.boxStore.upsert(entities.entities.boxes[entity._id], entities.entities.boxes);
      this.sensorStore.upsertMany(Object.values(entities.entities.sensors));
    }));
  }

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
