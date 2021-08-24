import { Injectable } from '@angular/core';
import { CreateboxStore } from './createbox.store';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class CreateboxService {

  constructor(
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
}
