import { Injectable } from '@angular/core';
import { MapService } from '../map/map.service';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  constructor(private mapService: MapService) { }

  addPointLayer(name, data){

    data = this.toGeoJson(data);

    this.mapService.addSource(name, {
      "type": "geojson",
      "data": data,
      // "cluster": true,
      // "clusterRadius": 80,
    });
    this.mapService.addLayer({
      'id': name + 'layer',
      'type': 'circle',
      'source': name,
      'paint': {
      // make circles larger as the user zooms from z12 to z22
      'circle-radius': {
      'base': 1.75,
      'stops': [[12, 2], [22, 180]]
      },
      // color circles by ethnicity, using a match expression
      // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
      'circle-color': [
      'match',
      ['get', 'ethnicity'],
      'White', '#fbb03b',
      'Black', '#223b53',
      'Hispanic', '#e55e5e',
      'Asian', '#3bb2d0',
      /* other */ '#ccc'
      ]
      }
      });
  }

  toGeoJson(data){
    let geojson = data.map(item => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: item.currentLocation.coordinates,
        },
        properties: {
          name: item.name,
          exposure: item.exposure,
          state: item.state
        }
      }
    });

    geojson = {
      type: 'FeatureCollection',
      features: geojson
    };
    return geojson;
  }
}
