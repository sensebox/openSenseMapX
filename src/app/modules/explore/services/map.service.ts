import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Box } from 'src/app/models/box/state/box.model';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { BoxService } from 'src/app/models/box/state/box.service';
import { UiService } from 'src/app/models/ui/state/ui.service';

import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { arrayRemove } from '../box/osem-line-chart/helper/helpers';
import { environment } from './../../../../environments/environment';
import { Map, NavigationControl } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map;
  boxes$: Observable<Box[]>;
  compareModus$ = this.boxQuery.selectCompareModus$;
  compareTo$ = this.boxQuery.selectCompareTo$;
  compareModus: Boolean = false;

  baseLayersInit: Boolean = false;
  dataInit = false;
  oldFilter;

  deactivatePopupTimer;
  activatePopupTimer;

  constructor(
    private boxQuery: BoxQuery,
    private boxService: BoxService,
    private uiService: UiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    //listen for changes to ComapeMode in order to change the click functions and layers
    this.compareModus$.pipe(withLatestFrom(this.compareTo$)).subscribe(res => {
      this.compareModus = res[0];
      if (this.map && this.map.getLayer('base-layer')) {
        if (res[0]) {
          this.map.off('mouseenter', 'base-layer', this.baseMouseenterFunction);
          this.map.off('click', 'base-layer', this.baseClickFunction);
          this.map.on('mouseenter', 'base-layer', this.compareMouseenterFunction);
          this.map.on('click', 'base-layer', this.compareClickFunction);
        } else {
          this.map.off('click', 'base-layer', this.compareClickFunction);
          this.map.off('mouseenter', 'base-layer', this.compareMouseenterFunction);
          this.map.on('mouseenter', 'base-layer', this.baseMouseenterFunction);
          this.map.on('click', 'base-layer', this.baseClickFunction);
        }

        if (res[1].length > 0) {
          this.map.setFilter('active-layer', ["match", ["get", "_id"], res[1], true, false]);
        }
      }
    })
  }

  generateMap(elementName) {

    let that = this;

    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox_token;
    this.map = new Map({
      container: elementName,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [13.5, 52.4],
      zoom: 8,
      pitch: 21
    });

    this.map.addControl(new NavigationControl());

    this.map.on('style.load', function () {
      that.boxService.setMapInit(true);
    })

    // this.map.on('styledataloading', function(){
    //   console.log("STYLE DATA loading")
    //   // that.boxService.setMapInit(true);
    // })

    // this.map.on('styledata', function(){
    //   console.log("STYLE DATA")
    //   // that.boxService.setMapInit(true);
    // })

    // this.map.on('sourcedataloading', function(){
    //   console.log("SOURCE DATA LAODING")
    //   // that.boxService.setMapInit(true);
    // })

    // this.map.on('sourcedata', function(){
    //   console.log("SOURCE DATA")
    //   // that.boxService.setMapInit(true);
    // })
  }

  //add last measurements to live attribute
  convertLastMeasurement(data) {
    let returnData = data.map(box => {
      let newValues = {}
      if (box.sensors) {
        box.sensors.map(sensor => {
          if (sensor && sensor.lastMeasurement) {
            let newSensor = {};
            newValues[sensor.title] = parseFloat(sensor.lastMeasurement.value)
          }
          return null;
        })
      }
      let newBox = { ...box, live: newValues };
      return newBox;
    })
    return returnData;
  }

  //Convert the data to geoJson for mapbox
  toGeoJson(data) {
    let geojson = data.filter(item => item.currentLocation).map(item => {
      if (item.currentLocation) {
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
      }
    });

    geojson = {
      type: 'FeatureCollection',
      features: geojson
    };
    return geojson;
  }

  addClickFuntion(layer) {
    this.map.on('click', layer, this.baseClickFunction);
  }

  baseClickFunction = e => {
    if (e.features.length > 0) {
      this.router.navigate(['/explore/' + e.features[0].properties._id], {
        relativeTo: this.activatedRoute,
        queryParamsHandling: 'merge'
      });
    }
  }

  compareClickFunction = e => {

    if (e.features.length > 0) {

      let newIds = [];
      if (this.activatedRoute.snapshot.queryParams.id) {
        if (Array.isArray(this.activatedRoute.snapshot.queryParams.id)) {
          if (this.activatedRoute.snapshot.queryParams.id.indexOf(e.features[0].properties._id) != -1) {
            newIds = arrayRemove(this.activatedRoute.snapshot.queryParams.id, e.features[0].properties._id)
          } else {
            newIds = [...this.activatedRoute.snapshot.queryParams.id, e.features[0].properties._id]
          }
        } else {
          if (this.activatedRoute.snapshot.queryParams.id === e.features[0].properties._id) {
            newIds = []
          } else {
            newIds = [this.activatedRoute.snapshot.queryParams.id, e.features[0].properties._id]
          }
        }
      }
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: { id: newIds },
          queryParamsHandling: 'merge'
        });
    }
  }

  addPopup(layer) {
    let that = this;

    this.map.on('mouseenter', layer, 
      function(e){
        that.activatePopupTimer = setTimeout(function(){
          that.baseMouseenterFunction(e);
        }, 100);
      }
    );

    this.map.on('mouseleave', layer, function () {
      that.map.getCanvas().style.cursor = '';
      clearTimeout(that.activatePopupTimer);
      that.deactivatePopupTimer = setTimeout(function(){
        that.boxService.setPopupBox(null);
      }, 320)
    });
    
  }
  
  mouseEnterPopup(){
    clearTimeout(this.deactivatePopupTimer);
    this.deactivatePopupTimer = 0;
  }
  
  mouseLeavePopup(){
    let that = this;
    this.deactivatePopupTimer = setTimeout(function(){
      that.boxService.setPopupBox(null);
    }, 320);
  }

  setCompareModusClickFunctions() {
    this.map.off('mouseenter', 'base-layer', this.baseMouseenterFunction);
    this.map.off('click', 'base-layer', this.baseClickFunction);
    this.map.on('mouseenter', 'base-layer', this.compareMouseenterFunction);
    this.map.on('click', 'base-layer', this.compareClickFunction);
  }

  baseMouseenterFunction = e => {
    clearTimeout(this.deactivatePopupTimer);
    this.map.getCanvas().style.cursor = 'pointer';
    var coordinates = e.features[0].geometry.coordinates.slice();
    let pixelPosition = this.map.project(coordinates);
    let box = e.features[0].properties;

    this.boxService.setPopupBox({ ...box, sensors: JSON.parse(e.features[0].properties.sensors) });

    document.getElementById("osem-popup").style.top = pixelPosition.y + 'px';
    document.getElementById("osem-popup").style.left = pixelPosition.x + 'px';
    document.getElementById("osem-popup").style.display = 'block';

  }

  compareMouseenterFunction = e => {
    this.map.getCanvas().style.cursor = 'cell';
    var coordinates = e.features[0].geometry.coordinates.slice();
    let pixelPosition = this.map.project(coordinates);
    let box = e.features[0].properties;

    this.boxService.setPopupBox({ ...box, sensors: JSON.parse(e.features[0].properties.sensors) });

    document.getElementById("osem-popup").style.top = pixelPosition.y + 'px';
    document.getElementById("osem-popup").style.left = pixelPosition.x + 'px';
    document.getElementById("osem-popup").style.display = 'block';
  }


  setMapData(boxes) {
    this.updateBoxesData(boxes, this.map);
  }


  updateBoxesData(boxes, map) {
    boxes = this.convertLastMeasurement(boxes);

    if (!map.getSource('boxes')) {
      map.addSource('boxes', {
        type: "geojson",
        data: this.toGeoJson(boxes)
      })
    } else {
      map.getSource('boxes').setData(this.toGeoJson(boxes));
    }
    this.boxService.setDataInit(true);
  }


  setMapLayers(layers) {
    this.drawLayers(layers, this.map);
  }


  drawLayers(layers, map) {

    layers.forEach(element => {

      if (!map.getLayer(element.id)) {
        map.addLayer(element);

        if (map.getLayer('active-layer-text'))
          map.moveLayer(element.id, 'active-layer-text');

      } else {

        map.setPaintProperty(element.id, 'circle-color', element.paint['circle-color']);

        if (element.filter) {
          map.setFilter(element.id, element.filter);
        } else {
          map.setFilter(element.id);
        }
      }
      if (!map.getLayer('number-layer')) {
        this.addNumberLayer();
      }
      map.setPaintProperty('number-layer', 'text-color', element.paint['circle-color']);
      map.setLayoutProperty('number-layer', 'text-field', element.paint['circle-color'][2]);
    });
  }


  updateActiveLayer(id, theme) {

    if (id !== undefined) {
      let paint;
      if (theme === 'dark') {
        paint = {
          'text-color': '#f6f6f6',
          'text-halo-blur': 4,
          'text-halo-color': '#383838',
          'text-halo-width': 1
        }
      } else {
        paint = {
          'text-color': '#383838',
          'text-halo-blur': 4,
          'text-halo-color': '#f6f6f4',
          'text-halo-width': 1
        }
      }
      if (!this.map.getLayer('active-layer')) {
        this.map.addLayer({
          'id': 'active-layer-text',
          'type': 'symbol',
          'source': 'boxes',
          'filter': ["==", id, ["get", "_id"]],
          "paint": paint,
          "layout": {
            "text-field": ['format', ["get", "name"], { 'font-scale': 1.2 }],
            "text-variable-anchor": ["top"],
            "text-offset": [0, 1],
            // "text-font": [
            //   "DIN Offc Pro Medium",
            //   "Arial Unicode MS Bold"
            // ],
            "text-size": 18
          }
        });
        this.map.addLayer({
          'id': 'active-layer',
          'type': 'circle',
          'source': 'boxes',
          'filter': ["==", id, ["get", "_id"]],
          'paint': {
            'circle-radius': {
              'base': 1.75,
              'stops': [[1, 10], [22, 3580]]
            },
            'circle-blur': 0.6,
            // 'circle-stroke-width': 1,
            'circle-opacity': 0.6,
            'circle-color': theme === 'dark' ? '#ffffff' :'#383838'
          }
        }, 'base-layer');

      } else {

        this.map.setFilter('active-layer', ["==", id, ["get", "_id"]]);
        this.map.setFilter('active-layer-text', ["==", id, ["get", "_id"]]);
      }

    }
  }

  updateActiveLayerCompare(data, theme) {
    if (data.length > 0) {
      let paint;
      if (theme === 'dark') {
        paint = {
          'text-color': '#f6f6f6',
          'text-halo-blur': 4,
          'text-halo-color': '#383838',
          'text-halo-width': 1
        }
      } else {
        paint = {
          'text-color': '#383838',
          'text-halo-blur': 4,
          'text-halo-color': '#f6f6f4',
          'text-halo-width': 1
        }
      }
      if (!this.map.getLayer('active-layer')) {
        this.map.addLayer({
          'id': 'active-layer-text',
          'type': 'symbol',
          'source': 'boxes',
          'filter': ["match", ["get", "_id"], data, true, false],
          "paint": paint,
          "layout": {
            "text-field": ['format', ["get", "name"], { 'font-scale': 1.2 }],
            "text-variable-anchor": ["top"],
            "text-offset": [0, 1],
            // "text-font": [
            //   "DIN Offc Pro Medium",
            //   "Arial Unicode MS Bold"
            // ],
            "text-size": 18
          }
        });
        this.map.addLayer({
          'id': 'active-layer',
          'type': 'circle',
          'source': 'boxes',
          'filter': ["match", ["get", "_id"], data, true, false],
          'paint': {
            'circle-radius': {
              'base': 1.75,
              'stops': [[1, 10], [22, 2580]]
            },
            'circle-blur': 0.6,
            // 'circle-stroke-width': 1,
            'circle-opacity': 0.6,
            'circle-color': theme === 'dark' ? '#ffffff' :'#383838'
          }
        }, 'base-layer');

      } else {
        this.map.setFilter('active-layer-text', ["match", ["get", "_id"], data, true, false]);
        this.map.setFilter('active-layer', ["match", ["get", "_id"], data, true, false]);
      }
    }
  }

  addNumberLayer() {
    this.map.addLayer({
      'id': 'number-layer',
      'type': 'symbol',
      'source': 'boxes',
      "paint": {
        'text-color': [
          'interpolate',
          ['linear'],
          ["get", "Temperatur", ["object", ["get", "live"]]],
          -5, '#9900cc',
          0, '#0000ff',
          10, '#0099ff',
          20, '#ffff00',
          30, '#ff0000'
        ]
      },
      "layout": {
        "text-field": "",
        "text-variable-anchor": ["bottom"],
        "text-offset": [0, 1],
        "text-size": 15
      }
    }, 'base-layer');
  }

  setBaseLayerFilter(boxes) {
    this.oldFilter = this.map.getFilter('base-layer');
    this.map.setFilter('base-layer', ["match", ["get", "_id"], boxes, true, false]);
    this.map.setFilter('number-layer', ["match", ["get", "_id"], boxes, true, false]);
  }

  resetBaseFilter() {
    this.map.setFilter('base-layer', this.oldFilter);
    this.map.setFilter('number-layer', this.oldFilter);
  }

  colorActives(colors, theme) {
    //     'match',
    // ['get', 'ethnicity'],
    // 'White',
    // '#fbb03b',
    // 'Black',
    // '#223b53',
    // 'Hispanic',
    // '#e55e5e',
    // 'Asian',
    // '#3bb2d0',
    let colorArray = ['match', ['get', '_id']];
    colors.domain.forEach(domain => {
      colorArray.push(domain, colors.getColor(domain));
    });
    if (theme === 'dark') {
      colorArray.push('#FFFFFF')
    } else {
      colorArray.push('#383838')
    }
    this.map.setPaintProperty('active-layer-text', 'text-color', colorArray);
  }

  setThemeLight() {
    this.boxService.setMapInit(false);
    this.boxService.setDataInit(false);
    this.uiService.updateBaseLayer(
      {
        'paint': {
          'circle-radius': {
            'base': 1.75,
            'stops': [[1, 2], [22, 3080]]
          },
          'circle-stroke-width': 1,
          'circle-blur': 0
        }
      }
    );
    this.map.setPaintProperty('active-layer-text', 'text-color', '#383838');
    this.map.setPaintProperty('active-layer-text', 'text-halo-color', '#f6f6f6');
    this.map.setPaintProperty('active-layer', 'circle-color', '#383838');
    this.map.setStyle("mapbox://styles/mapbox/light-v9");
    
  }
  
  setThemeDark() {
    this.boxService.setMapInit(false);
    this.boxService.setDataInit(false);
    this.uiService.updateBaseLayer(
      {
        'paint': {
          'circle-radius': {
            'base': 1.75,
            'stops': [[1, 2], [22, 3080]]
          },
          'circle-stroke-width': 0,
          'circle-blur': 0.8,
        }
      }
      );
      this.map.setPaintProperty('active-layer-text', 'text-color', 'white');
      this.map.setPaintProperty('active-layer-text', 'text-halo-color', '#383838');
      this.map.setPaintProperty('active-layer', 'circle-color', '#ffffff');
    this.map.setStyle("mapbox://styles/mapbox/dark-v9");

  }
}
