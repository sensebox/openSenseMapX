import { Injectable } from '@angular/core';
import { CreateboxStore } from './createbox.store';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class CreateboxService {

  constructor(
    private http: HttpClient,
    private createboxStore: CreateboxStore) {
  }

  selectDevice(device){
    this.createboxStore.update( state => ({ ...state , selectedDevice: device }));
  }
  selectSensor(sensor){
    this.createboxStore.toggleSensor(sensor);
  }
  selectSensorElement(sensorElement){
    this.createboxStore.toggleSensorElement(sensorElement);
  }

  createBox(options){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+window.localStorage.getItem('sb_accesstoken'));

    //convert options to right format for API
    console.log(options);

    return this.http.post<any>(`${environment.api_url}/boxes`, options, {headers: headers}).subscribe(res => {
      console.log(res);
    });   
  }
}

