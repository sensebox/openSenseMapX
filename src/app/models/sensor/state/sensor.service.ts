import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { SensorStore } from './sensor.store';
import { Sensor } from './sensor.model';
import { tap } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class SensorService {

  constructor(private sensorStore: SensorStore,
              private http: HttpClient) {
  }

  // get() {
  //   // return this.http.get<Sensor[]>('https://api.com').pipe(tap(entities => {
  //   //   this.sensorStore.set(entities);
  //   // }));
  // }

  getValues(pheno, dateRange) {

  }

  getSingleSensorValues(boxId, sensorId, fromDate, toDate){
    //TODO: CHECK CACHE HERE
    return this.http.get<any[]>(`${environment.api_url}/boxes/${boxId}/data/${sensorId}?from-date=${fromDate}&to-date=${toDate}`).pipe(tap(data => {
      let mapData = data.map(item => {return {name: new Date(item.createdAt), value: item.value}})
      let upsert = {
        _id: sensorId,
        rawValues: mapData
      }
      this.sensorStore.upsert(sensorId, upsert);
      // this.sensorStore.addActive([sensorId]);
      console.log(sensorId);
      this.sensorStore.addCached(sensorId);
      // this.sensorStore.ui.upsert(sensorId, {hasData: true} )
    }));
  }
  
  add(sensor: Sensor) {
    this.sensorStore.add(sensor);
  }

  update(id, sensor: Partial<Sensor>) {
    this.sensorStore.update(id, sensor);
  }

  remove(id: ID) {
    this.sensorStore.remove(id);
  }

  setActive(sensor){
    this.sensorStore.setActive([sensor]);
  }
  addActive(sensor){
    this.sensorStore.addActive(sensor);
  }
  toggleActive(sensor){ 
    this.sensorStore.toggleActive(sensor);
  }
  resetCache(){
    this.sensorStore.resetCached();
  }
}
