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
    return this.http.get<any[]>(`${environment.sensor_wiki_url}/devices/all`).pipe(tap(entities => {
      let parsedEnts = entities.map(ent => {
        return {
          iri: ent.device.value.split('#')[1],
          label: ent.label[0].value ? ent.label[0].value : null,
          image: ent.image[0].value ? ent.image[0].value : null,
        }
      })
      this.deviceStore.set(parsedEnts);
    }));   
  }

  getSensors(device) {
    return this.http.get<any>(`${environment.sensor_wiki_url}/devices/device/${device}`).pipe(tap(entities => {
      console.log(entities);
      // let parsedEnts = entities.map(ent => {
      //   return {
      //     label: ent.label[0].value ? ent.label[0].value : null,
      //     image: ent.image[0].value ? ent.image[0].value : null,
      //   }
      // })
      // this.deviceStore.update(state => { return {...state, sensors: parsedEnts }});
    }));   

  }
  
}