import { Injectable } from '@angular/core';
import { Map, NavigationControl } from 'mapbox-gl';

import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { Box } from 'src/app/models/box/state/box.model';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { BoxService } from 'src/app/models/box/state/box.service';
import { Router } from '@angular/router';
import { throttleable } from '@swimlane/ngx-charts/release/utils';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private boxQuery: BoxQuery, private boxService: BoxService, private router: Router) { }

  map;
  boxes$: Observable<Box[]>;
  layers$;
  activeBox$ = this.boxQuery.selectActiveId();

  generateMap(elementName) {
    
    console.log("Initmap")
    let that = this;

    this.boxService.get().subscribe();
    (mapboxgl as typeof mapboxgl).accessToken = "pk.eyJ1IjoidW11dDAwIiwiYSI6ImNqbnVkbnFxNDB2YnIzd3M1eTNidTA3MjUifQ.3gqG1JYEQvckOiiQ8B3NQQ";
    this.map = new Map({
      container: elementName,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [13.5,52.4],
      zoom: 8,
      pitch: 21
    });

    this.map.addControl(new NavigationControl());

    this.boxes$ = this.boxQuery.selectAll();

    this.layers$ = this.boxQuery.select(ent => ent.ui.layers);

    this.map.on('load', function(){
      that.boxes$.subscribe(boxes => {

        boxes = that.convertLastMeasurement(boxes);
        if(!that.map.getSource('boxes')){
          that.map.addSource('boxes', {
            type: "geojson",
            data: that.toGeoJson(boxes)
          })
        } else {
          console.log(that.toGeoJson(boxes));
          that.map.getSource('boxes').setData(that.toGeoJson(boxes));
        }
      });

      that.activeBox$.subscribe(res => {
        if(res){
          if(!that.map.getLayer('active-layer')){
            that.map.addLayer({
              'id': 'active-layer-text',
              'type': 'symbol',
              'source': 'boxes',
              'filter': ["==", res, ["get", "_id"]],
              "paint": {
                'text-color': '#FFFFFF',
                'text-halo-blur': 2,
                'text-halo-color': '#000000',
                'text-halo-width': 2
              },
              "layout": {
                "text-field": ["get", "name"],
                "text-variable-anchor": ["top"],
                "text-offset": [0,1],
                // "text-font": [
                //   "DIN Offc Pro Medium",
                //   "Arial Unicode MS Bold"
                // ],
                "text-size": 15
              } 
            });
            that.map.addLayer({
              'id': 'active-layer',
              'type': 'circle',
              'source': 'boxes',
              'filter': ["==", res, ["get", "_id"]],
              'paint': {
              'circle-radius': {
                'base': 1.75,
                'stops': [[1, 10], [22, 3580]]
              },
              'circle-blur': 0.6,
              // 'circle-stroke-width': 1,
              'circle-opacity': 0.6,
              'circle-color': '#FFFFFF'
              } 
            }, 'active-layer-text');
            
            if(that.map.getLayer('base-layer'))
              that.map.moveLayer('base-layer', 'active-layer-text')
          } else {
            that.map.setFilter('active-layer', ["==", res, ["get", "_id"]])
            that.map.setFilter('active-layer-text', ["==", res, ["get", "_id"]])
          }
        }
      })

      that.layers$.subscribe(layers => {
        layers.forEach(element => {
          console.log(element);
          if(!that.map.getLayer(element.id)) {
            that.map.addLayer(element);
            if(that.map.getLayer('active-layer-text'))
              that.map.moveLayer(element.id, 'active-layer-text')
          } else {
            that.map.setPaintProperty(element.id, 'circle-color', element.paint['circle-color']);
            if(element.filter){
              that.map.setFilter(element.id, element.filter);
            } else {
              that.map.setFilter(element.id);
            }
          }
        });
      });
      //add mouse functions for base-layer
      that.addPopup('base-layer');
      that.addClickFuntion('base-layer');
    });
  }


  convertLastMeasurement(data){
    let returnData = data.map(box => {
      let newValues = {}
      box.sensors.map(sensor => {
        if(sensor.lastMeasurement){
          let newSensor = { };
          // newSensor[sensor.title] =  sensor.lastMeasurement.value
          newValues[sensor.title] =  parseFloat(sensor.lastMeasurement.value)
        }
        return null;
      })
      let newBox = {...box, live: newValues};
      return newBox;
    })
    return returnData;
  }
  // convertLastMeasurement(data){
  //   let returnData = data.map(item => {
  //     let newItemSensor = item.sensors.map(sensor => {
  //       if(sensor.lastMeasurement){
  //         let newItem = {...item, values: {} }
  //         newItem.values[sensor.title] = {last: sensor.lastMeasurement.value}
  //         console.log(newItem);
  //         return newItem;
  //       }
  //     })
  //     return {...item, sensors: newItemSensor};
  //   })
  //   console.log(returnData);
  //   return data;
  // }


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
          _id: item._id,
          exposure: item.exposure,
          state: item.state,
          sensors: item.sensors,
          values: item.values ? item.values : null,
          live: item.live ? item.live : null
        }
      }
    });

    geojson = {
      type: 'FeatureCollection',
      features: geojson
    };
    return geojson; 
  }

  addClickFuntion(layer) {
    let that = this;
    this.map.on('click', layer, function (e) {
       
      if(e.features.length > 0){
        that.router.navigate(['/explore/'+e.features[0].properties._id]);
      }
    });
  }

  addPopup(layer) {
    let that = this;

    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
       
    this.map.on('mouseenter', layer, function(e) {
      that.map.getCanvas().style.cursor = 'pointer';

        
      var coordinates = e.features[0].geometry.coordinates.slice();
        
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      let description = "<h3>" + e.features[0].properties.name + '</h3>' + e.features[0].properties.values

      let sensors = JSON.parse(e.features[0].properties.sensors);
      for(let sensor in sensors) {
        let sensorItem = sensors[sensor];
        description += '<p>' + sensorItem.title + '</p>'
      }
  
      popup.setLngLat(coordinates)
        .setHTML(description)
        .addTo(that.map);
    });
      
    this.map.on('mouseleave', layer, function() {
      that.map.getCanvas().style.cursor = '';
      popup.remove();
    });
  }


}
