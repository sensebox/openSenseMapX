import { Injectable } from '@angular/core';
import { Map, NavigationControl } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';

// declare var mapboxgl: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map;

  constructor() { }

  generateMap(elementName) {
    (mapboxgl as typeof mapboxgl).accessToken = "pk.eyJ1IjoidW11dDAwIiwiYSI6ImNqbnVkbnFxNDB2YnIzd3M1eTNidTA3MjUifQ.3gqG1JYEQvckOiiQ8B3NQQ";
    this.map = new Map({
      container: elementName,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [10,50],
      zoom: 2,
      pitch: 21
    });

    this.map.addControl(new NavigationControl());
  }

  addSource(name, data){
    if(this.map){
      this.map.addSource(name, data);
    }
  }

  addLayer(data){
    if(this.map){
      this.map.addLayer(data);
    }
  }
}
