import { Injectable } from "@angular/core";
import { DeviceStore } from "./device.store";
import { Device } from "./device.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { environment } from "./../../../../environments/environment";
import { state } from "@angular/animations";

@Injectable({ providedIn: "root" })
export class DeviceService {
  constructor(private deviceStore: DeviceStore, private http: HttpClient) {}

  get() {
    return this.http
      .get<any[]>(`${environment.sensor_wiki_url}/devices/all?language=de`)
      .pipe(
        tap((entities) => {
          console.log(entities);
          entities.map((entity) => {
            this.deviceStore.add({
              ...entity,
              description: entity.description.item[0].text,
              label: entity.label.item[0].text,
            });
          });
        })
      );
  }

  // Function to get all sensors for a device (is this the right place for it?)
  getSensors(device) {
    console.log(device);
    return this.http
      .get<any>(`${environment.sensor_wiki_url}/devices/${device}/sensors`)
      .pipe(
        tap((entities) => {
          console.log(entities);
        }),
        map((entities) => {
          return entities;
        })
      );
  }

  // Function to get all sensors for a custom device (is this the right place for it?)
  getAllSensors() {
    return this.http
      .get<any>(`${environment.sensor_wiki_url}/devices/all/sensors`)
      .pipe(
        tap((entities) => {
          console.log("CUSTOM SENSORS", entities);
        })
      );
  }
}
