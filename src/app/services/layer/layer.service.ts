import { Injectable } from '@angular/core';
import { MapService } from '../map/map.service';
import { identifierModuleUrl } from '@angular/compiler';

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
      'circle-radius': {
        'base': 1.75,
        'stops': [[1, 2], [22, 3080]]
      },
      'circle-color': [
        'match',
        ['get', 'state'],
        'active', '#4EAF47',
        'old', '#eb5933',
        /* other */ '#ccc200'
        ]
      }
    });
    // this.mapService.addLayer({
    //   'id': name + 'layer',
    //   'type': 'circle',
    //   'source': name,
    //   'paint': {
    //   'circle-radius': {
    //     'base': 1.75,
    //     'stops': [[1, 2], [22, 3080]]
    //   },
    //   'circle-color': [
    //     'interpolate',
    //     ['linear'],
    //     [ "get", "2019-10-23T14:00:00.000Z", ["object", ["get", "values"]]],
    //     10, '#4EAF47',
    //     30, '#eb5933']
    //   }
    // });
  }

  toGeoJson(data){
    let geojson = data.map(item => {
      console.log(item.values);
      if(item.values){
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: item.currentLocation.coordinates,
          },
          properties: {
            values: item.values['Temperatur'],
            name: item.name,
            _id: item._id,
            exposure: item.exposure,
            state: item.state,
            sensors: item.sensors,
            
          }
        }
      } else {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: item.currentLocation.coordinates,
          },
          properties: {
            name: item.name,
            _id: item._id,
            exposure: item.exposure,
            state: item.state,
            sensors: item.sensors,
            
          }
        }
      }
    });

    geojson = {
      type: 'FeatureCollection',
      features: geojson
    };
    return geojson;
  }

  updateData(name, data){
    console.log(data);
    this.mapService.updateData(name, this.toGeoJson(data));

  }
}
