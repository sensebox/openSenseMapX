import { Injectable } from '@angular/core';
import { DeviceStore } from './device.store';
import { Device } from './device.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { state } from '@angular/animations';



@Injectable({ providedIn: 'root' })
export class DeviceService {

  constructor(
    private deviceStore: DeviceStore,
    private http: HttpClient) {
  }

  get() {
    return this.http.get<any[]>(`${environment.sensor_wiki_url}/devices/all?format=json`).pipe(tap(entities => {
      let parsedEnts = entities.map(ent => {
        return {
          iri: ent.device.value.split('#')[1],
          label: ent.deviceLabel[0].value ? ent.deviceLabel[0].value : null,
          image: ent.image[0] ? ent.image[0].value : null,
        }
      })
      this.deviceStore.set(parsedEnts);
    }));   
  }


  // Function to get all sensors for a device (is this the right place for it?)
  getSensors(device) {
    return this.http.get<any>(`${environment.sensor_wiki_url}/devices/device/${device}/sensors`).pipe(tap(entities => {
      console.log(entities);
    }));   
  }
  
  // Function to get all sensors for a custom device (is this the right place for it?)
  getAllSensors() {
    return this.http.get<any>(`${environment.sensor_wiki_url}/devices/all/sensors`).pipe(tap(entities => {
      console.log("CUSTOM SENSORS", entities);
    }));   
  }
  
}