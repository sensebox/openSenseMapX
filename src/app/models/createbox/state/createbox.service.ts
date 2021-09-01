import { Injectable } from '@angular/core';
import { CreateboxStore } from './createbox.store';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BoxStore } from '../../box/state/box.store';
import { SensorStore } from '../../sensor/state/sensor.store';
import { processBoxData } from 'src/app/modules/explore/box/osem-line-chart/helper/helpers';
import { Router } from '@angular/router';
import { BoxService } from '../../box/state/box.service';


@Injectable({ providedIn: 'root' })
export class CreateboxService {

  constructor(
    private http: HttpClient,
    private boxStore: BoxStore,
    private boxService: BoxService,
    private sensorStore: SensorStore,
    private router: Router,
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

    return this.http.post<any>(`${environment.api_url}/boxes`, options, {headers: headers}).subscribe(res => {
      let normalize = processBoxData([res.data]);
      this.boxStore.upsertMany(normalize[0]);
      this.sensorStore.upsertMany(normalize[1]);
      this.router.navigate([{ outlets: { sidebar: [ 'm', 'profile', 'boxes' ] }}]);
    });   
  }
}

