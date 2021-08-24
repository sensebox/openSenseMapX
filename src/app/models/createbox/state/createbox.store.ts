import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import { Device } from '../../device/state/device.model';
import { Sensor } from '../../sensor/state/sensor.model';

export interface CreateboxState {
  selectedDevice: Device,
  selectedSensors: Sensor[],
  selectedSensorElements: any[],
  exposure: string,
  name: string,
  location: Number[]

}

export function createInitialState(): CreateboxState {
  return {
    selectedDevice: null,
    selectedSensors: [],
    selectedSensorElements: [],
    exposure: null,
    name: null,
    location: [null, null]
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'createbox' })
export class CreateboxStore extends Store<CreateboxState> {

  constructor() {
    super(createInitialState());
  }

  toggleSensor(sensor){
    
    this.update( state => {
      if(state.selectedSensors.indexOf(sensor) === -1){
        return { ...state, selectedSensors: [...state.selectedSensors, sensor ]}
      } else {
        let newSelectedSensors = [...state.selectedSensors.slice(0, state.selectedSensors.indexOf(sensor)), ...state.selectedSensors.slice(state.selectedSensors.indexOf(sensor)+1)];
        return { ...state, selectedSensors: newSelectedSensors};
      }
    })
  }

  toggleSensorElement(sensorElement){
    
    this.update( state => {
      let index = state.selectedSensorElements.findIndex(item => item.sensorElement.phenomenon === sensorElement.sensorElement.phenomenon && item.sensor.sensor.value === sensorElement.sensor.sensor.value);
      if(index === -1){
        return { ...state, selectedSensorElements: [...state.selectedSensorElements, sensorElement ]}
      } else {
        let newSelectedSensorElements = [...state.selectedSensorElements.slice(0, index), ...state.selectedSensorElements.slice(index+1)];
        return { ...state, selectedSensorElements: newSelectedSensorElements}
      }
    })
  }
}


