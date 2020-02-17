import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Box } from 'src/app/models/box/state/box.model';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { BoxService } from 'src/app/models/box/state/box.service';
import { UiService } from 'src/app/models/ui/state/ui.service';

import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { arrayRemove, extractDateSteps, positionPopup } from '../box/osem-line-chart/helper/helpers';
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

  currentClusterLayers;
  
  mouseLeaveFunction;
  clusterMouseleaveFunctionSave;
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
         
          this.map.off('mouseenter', 'boxes-no-cluster', this.baseMouseenterFunction);
          this.map.off('click', 'boxes-no-cluster', this.baseClickFunction);
          this.map.on('mouseenter', 'boxes-no-cluster', this.compareMouseenterFunction);
          this.map.on('click', 'boxes-no-cluster', this.compareClickFunction);
        } else {
          this.map.off('click', 'base-layer', this.compareClickFunction);
          this.map.off('mouseenter', 'base-layer', this.compareMouseenterFunction);
          this.map.on('mouseenter', 'base-layer', this.baseMouseenterFunction);
          this.map.on('click', 'base-layer', this.baseClickFunction);
         
          this.map.off('click', 'boxes-no-cluster', this.compareClickFunction);
          this.map.off('mouseenter', 'boxes-no-cluster', this.compareMouseenterFunction);
          this.map.on('mouseenter', 'boxes-no-cluster', this.baseMouseenterFunction);
          this.map.on('click', 'boxes-no-cluster', this.baseClickFunction);
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
            createdAt: item.createdAt,
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
  addClusterClickFunction(layer) {
    this.map.on('click', layer, this.clusterClickFunction);
  }

  baseClickFunction = e => {
    if (e.features.length > 0) {
      this.router.navigate(['/explore/' + e.features[0].properties._id], {
        relativeTo: this.activatedRoute,
        queryParamsHandling: 'merge'
      });
    }
  }
  clusterClickFunction = e => {
    let that = this;
    let layer = e.features[0].layer.id;
    this.map.getCanvas().style.cursor = 'pointer';
    var coordinates = e.features[0].geometry.coordinates.slice();
    let pixelPosition = this.map.project(coordinates);
    // let box = e.features[0].properties;
    let clusterSource = this.map.getSource(this.map.getLayer(layer).source);
    var clusterId = e.features[0].properties.cluster_id,
    point_count = e.features[0].properties.point_count;

    // Get all points under a cluster
    clusterSource.getClusterLeaves(clusterId, point_count, 0, function(err, aFeatures){
     
      that.uiService.setCluster(aFeatures);
    });


    positionPopup(pixelPosition);
    // document.getElementById("osem-popup").style.top = pixelPosition.y + 'px';
    // document.getElementById("osem-popup").style.left = (pixelPosition.x+10) + 'px';
    // document.getElementById("osem-popup").style.display = 'block';
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

  clusterMouseoverFunction = (e) => {
    if (e.features.length > 0) {
      let layer = e.features[0].layer.id;
      this.map.getCanvas().style.cursor = 'pointer';
      let that = this;
      var features = this.map.queryRenderedFeatures(e.point, { layers: [layer] });
      var clusterId = features[0].properties.cluster_id,
      point_count = features[0].properties.point_count,
      clusterSource = this.map.getSource(this.map.getLayer(layer).source);
    
      // Get Next level cluster Children
      // 
      // clusterSource.getClusterChildren(clusterId, function(err, aFeatures){
      //   console.log('getClusterChildren', err, aFeatures);
      // });
    
      // Get all points under a cluster
      clusterSource.getClusterLeaves(clusterId, point_count, 0, function(err, aFeatures){
        //MAKE LAYER AND SOURCE ADD TO MAP
        that.map.getSource('cluster-hover').setData({
          type: 'FeatureCollection',
          features: aFeatures
        });
      });
    }
  }

  clusterMouseleaveFunction = e => {
    this.map.getCanvas().style.cursor = '';
    this.map.getSource('cluster-hover').setData({
      type: 'FeatureCollection',
      features: []
    });
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
    if(!this.mouseLeaveFunction)
      this.mouseLeaveFunction = this.mouseLeave.bind(this);
    // this.mouseLeaveFunction = this.mouseLeave.bind(this);
    this.map.on('mouseleave', layer, this.mouseLeaveFunction);
    // this.map.on('mouseleave', layer, function(){
    //   console.log("LEAVE YOOO")
    //   that.mouseLeave(that);
    // });
  }

  addHoverCluster(layer, pheno){
    if(!this.map.getSource('cluster-hover')){
      this.map.addSource('cluster-hover', {
        type: "geojson",
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
  
      this.map.addLayer({
        'id': 'cluster-hover-layer',
        'type': 'circle',
        'source': 'cluster-hover',
        'paint': {
          'circle-radius': {
          'base': 1.75,
          'stops': [[1, 6], [22, 580]]
          },
          'circle-opacity': 0.4,
          'circle-color': 'black'
        }
      });
    }
    if(pheno)
      this.map.setPaintProperty('cluster-hover-layer', 'circle-color', pheno['layer']['paint']['circle-color']);

    this.clusterMouseleaveFunctionSave = this.clusterMouseleaveFunction.bind(this)
    this.map.on('mouseenter', layer, this.clusterMouseoverFunction);
    this.map.on('mouseleave', layer, this.clusterMouseleaveFunctionSave);
  }

  mouseLeave(){
    // let that = this;
    this.map.getCanvas().style.cursor = '';
    this.boxService.setPopupBox(null);
    // clearTimeout(that.activatePopupTimer);
    // that.deactivatePopupTimer = setTimeout(function(){
      // }, 320)
    }
    
    mouseEnterPopup(box){
      // console.log("HALLLOOOO")
      // clearTimeout(this.deactivatePopupTimer);
    // this.deactivatePopupTimer = 0;
    this.boxService.setPopupBox(box)
  }
  
  mouseLeavePopup(){
    // let that = this;
    this.boxService.setPopupBox(null);
    // this.deactivatePopupTimer = setTimeout(function(){
    // }, 320);
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

    this.uiService.setCluster(null);
    this.boxService.setPopupBox({ ...box, sensors: JSON.parse(e.features[0].properties.sensors) });

    positionPopup(pixelPosition);
    // document.getElementById("osem-popup").style.display = 'block';

  }

  compareMouseenterFunction = e => {
    this.map.getCanvas().style.cursor = 'cell';
    var coordinates = e.features[0].geometry.coordinates.slice();
    let pixelPosition = this.map.project(coordinates);
    let box = e.features[0].properties;

    this.boxService.setPopupBox({ ...box, sensors: JSON.parse(e.features[0].properties.sensors) });

    positionPopup(pixelPosition);
    // document.getElementById("osem-popup").style.top = pixelPosition.y + 'px';
    // document.getElementById("osem-popup").style.left = (pixelPosition.x+10) + 'px';
    // document.getElementById("osem-popup").style.display = 'block';
  }


  setMapData(boxes, pheno, clusterLayers, dateRange) {
    this.updateBoxesData(boxes, pheno, this.map, clusterLayers, dateRange);
  }

  filterByProperty(data, property){
    let newData = data["features"].filter(res => {
      if(res['properties']['live'] && res['properties']['live'][property]){
        return res;
      }
    })
    return {type: "FeatureCollection", features: newData};
  }

  filterByClusterProperty(data, property, time){
    let newData = data["features"].filter(res => {
      if(res['properties']['values'] && res['properties']['values'][property] && res['properties']['values'][property][time])
        return res;
    });
    return {type: "FeatureCollection", features: newData};
  }


  updateBoxesData(boxes, pheno, map, clusterLayers, dateRange) {
    boxes = this.convertLastMeasurement(boxes);

    if (!map.getSource('boxes')) {
 
      // source for single Boxes
      map.addSource('boxes', {
        type: "geojson",
        data: this.toGeoJson(boxes)
      });

      //Source for clusterlayer, TODO: Dynamically add phenomena when sensor-wiki is finished
      if(boxes && pheno){
        this.addClusterSource(boxes, pheno, map, dateRange);
        this.drawClusterLayers(clusterLayers, map, dateRange);
      }

    } else {
      // console.log("SET DATA: ", boxes)
      map.getSource('boxes').setData(this.toGeoJson(boxes));
      //if dateRange is active new sources are being added
      if(dateRange) {
        this.addClusterSource(boxes, pheno, map, dateRange);
      }
    }
    this.boxService.setDataInit(true);
  }

  addClusterSource(boxes, pheno, map, dateRange) {

    if(map.getLayer('boxes-cluster')){
      map.removeLayer('boxes-no-cluster')
      map.removeLayer('boxes-cluster')
      map.removeLayer('cluster-number-layer')
      map.removeLayer('no-cluster-number')
    }
    if(map.getSource('cluster-boxes')){
      map.removeSource('cluster-boxes');
    }
    
    //Source for clusterlayer, TODO: Dynamically add phenomena when sensor-wiki is finished
    if(dateRange){
      // console.log(dateRange);
      // console.log(extractDateSteps(dateRange));
      this.addDateRangeClusterSources(extractDateSteps(dateRange),boxes, pheno);
    } 
    
    map.addSource('cluster-boxes', {
      'type': 'geojson',
      'data': this.filterByProperty(this.toGeoJson(boxes), pheno.title),
      'cluster': true,
      'clusterRadius': 65,
      'clusterProperties': { 
        'Temperatur': ['+', ['case', ["!=", null, [ "get", "Temperatur", ["object", ["get", "live"]]]], [ "get", "Temperatur", ["object", ["get", "live"]]], null]],
        'Luftdruck': ['+', ['case', ["!=", null, [ "get", "Luftdruck", ["object", ["get", "live"]]]], [ "get", "Luftdruck", ["object", ["get", "live"]]], null]],
        'rel. Luftfeuchte': ['+', ['case', ["!=", null, [ "get", "rel. Luftfeuchte", ["object", ["get", "live"]]]], [ "get", "rel. Luftfeuchte", ["object", ["get", "live"]]], null]],
        'PM10': ['+', ['case', ["!=", null, [ "get", "PM10", ["object", ["get", "live"]]]], [ "get", "PM10", ["object", ["get", "live"]]], null]],
        'PM2.5': ['+', ['case', ["!=", null, [ "get", "PM2.5", ["object", ["get", "live"]]]], [ "get", "PM2.5", ["object", ["get", "live"]]], null]],
        'Beleuchtungsstärke': ['+', ['case', ["!=", null, [ "get", "Beleuchtungsstärke", ["object", ["get", "live"]]]], [ "get", "Beleuchtungsstärke", ["object", ["get", "live"]]], null]],
        'UV-Intensität': ['+', ['case', ["!=", null, [ "get", "UV-Intensität", ["object", ["get", "live"]]]], [ "get", "UV-Intensität", ["object", ["get", "live"]]], null]],
      }
    });
    
  }

  addDateRangeClusterSources(steps, boxes, pheno){
    const clusterProperties = steps.map(step => {
      return { 
        [step.toISOString()]: 
          ['+', 
            [ "get", step.toISOString() ,
                [ "get", pheno.title, 
                  ["object", ["get", "values"]]
                ]
              ]
            // ['case',
            //   ["!=", null, 
            //     [ "get", step.toISOString() ,
            //       [ "get", pheno.title, 
            //         ["object", ["get", "values"]]
            //       ]
            //     ]
            //   ], 
            //   [ "get", step.toISOString() ,
            //     [ "get", pheno.title, 
            //       ["object", ["get", "values"]]
            //     ]
            //   ], 0
            // ]
          ]
      }
    });
    // console.log("CLUSTERPROPERTIES:" ,clusterProperties);
    steps.forEach((step, index) => {
      // let clusterProperty = [ "get", step.toISOString(),[ "get", property, ["object", ["get", "values"]]]];
      // console.log(this.filterByClusterProperty(this.toGeoJson(boxes), property, step.toISOString()));
      if(this.map.getSource('cluster'+ step.toISOString())){
        this.map.removeLayer('cluster'+ step.toISOString());
        this.map.removeLayer('cluster-number-layer'+ step.toISOString());
        this.map.removeLayer('no-cluster-number'+ step.toISOString());
        this.map.removeLayer('boxes-no-cluster'+ step.toISOString());
        this.map.removeSource('cluster'+ step.toISOString());
      }

      this.map.addSource('cluster'+ step.toISOString(), {
        'type': 'geojson',
        'data': this.filterByClusterProperty(this.toGeoJson(boxes), pheno.title, step.toISOString()),
        'cluster': true,
        'clusterRadius': 65,
        'clusterProperties': clusterProperties[index]
      });

      let circleColorCluster = [
        'interpolate',
        ['linear'],
        ['/', ["get", step.toISOString()],
        ["get", "point_count"]]];

      circleColorCluster = circleColorCluster.concat(pheno['layer']['paint']['circle-color'].slice(3, pheno['layer']['paint']['circle-color'].length))
      
      let circleColorSingle = [
        'interpolate', 
        ['linear'], 
        [ "get", step.toISOString(),[ "get", pheno.title,["object", ["get", "values"]]]],
      ]
      
      circleColorSingle = circleColorSingle.concat(pheno['layer']['paint']['circle-color'].slice(3, pheno['layer']['paint']['circle-color'].length))
      
      this.map.addLayer({
        'id': 'cluster'+ step.toISOString(),
        'type': 'circle',
        'source': 'cluster'+ step.toISOString(),
        'layout': {
          'visibility': 'none'
        },
        'filter':
        [
          'all',
          ["!=", null, ['get', step.toISOString()]],
          ['==', ['get', 'cluster'], true],
          ['has', 'point_count']
        ],
        'paint': {
    
            'circle-radius': {
                'property': 'point_count',
                'base': 1.75,
                'stops': [
                    [{zoom: 1, value: 1}, 20],
                    [{zoom: 1, value: 100}, 40],
                    [{zoom: 22, value: 1}, 3580],
                    [{zoom: 22, value: 100}, 6580],
                ]
            },
            'circle-color': circleColorCluster,
            'circle-stroke-color': '#8dd3c7',
            'circle-stroke-width': 2
        }
      });

      this.addClusterClickFunction('cluster'+ step.toISOString());
      this.addHoverCluster('cluster'+ step.toISOString(), null);
      
      this.map.addLayer({
        'id': 'boxes-no-cluster'+ step.toISOString(),
        'type': 'circle',
        'source': 'cluster'+ step.toISOString(),
        'layout': {
          'visibility': 'none'
        },
        'filter':
        [
          'all',
          // ["!=", null, ["get", step.toISOString(), [ "get", pheno.title, ["object", ["get", "values"]]]]],
          ['!', ['has', 'point_count']]
        ]
        ,
        'paint': {
          'circle-radius': {
            'base': 1.75,
            'stops': [[1, 10], [22, 1580]]
          },
          'circle-color': circleColorSingle,
        }
      });
      this.addClickFuntion('boxes-no-cluster'+ step.toISOString());
      this.addPopup('boxes-no-cluster'+ step.toISOString());

      this.map.addLayer({
        'id': 'cluster-number-layer'+ step.toISOString(),
        'type': 'symbol',
        'source': 'cluster'+step.toISOString(),
        'filter':  ['has', 'point_count'],
          //     'all',
          //     // ["get", "Temperatur", ["object", ["get", "live"]]],
          //     // ['==', ['get', 'cluster'], true]
          //     ['has', 'point_count']
          //   ],
        "paint": {
          'text-color': "white"
        },
        "layout": {
          "visibility": "none",
          "text-field": ["concat", ['/',['round',[ '*', ['/', ["get", step.toISOString()], ["get", "point_count"]], 100]],100], ""],
          "text-size": 15,
          'text-font': ['Montserrat Bold', 'Arial Unicode MS Bold'],
        }
      });
      
      this.map.addLayer({
        'id': 'no-cluster-number'+step.toISOString(),
        'type': 'symbol',
        'source': 'cluster'+step.toISOString(),
        'filter': ['!', ['has', 'point_count']],
        "paint": {
          'text-color': circleColorSingle
        },
        "layout": {
          "visibility": "none",
          "text-field": ["get", step.toISOString(), ["get", pheno.title, ["object", ["get", "values"]]]],
          "text-variable-anchor": ["bottom"],
          "text-offset": [0, 1],
          "text-size": 15
        }
      });
    })
    this.map.setLayoutProperty('cluster'+ steps[0].toISOString(), 'visibility', 'visible');
    this.map.setLayoutProperty('boxes-no-cluster'+ steps[0].toISOString(), 'visibility', 'visible');
    this.map.setLayoutProperty('cluster-number-layer'+ steps[0].toISOString(), 'visibility', 'visible');
    this.map.setLayoutProperty('no-cluster-number'+ steps[0].toISOString(), 'visibility', 'visible');

    // if(this.map.getLayer('boxes-cluster')){
      // setLayerSource('boxes-cluster', 'cluster'+ steps[0].toISOString(), 'boxes-cluster', this.map);   
    // }
  }


  setMapBaseLayer(layer) {
    this.drawBaseLayer(layer, this.map);
  }

  drawBaseLayer(layer, map) {

    if (!map.getLayer(layer.id)) {
      map.addLayer(layer);

      if (map.getLayer('active-layer-text'))
        map.moveLayer(layer.id, 'active-layer-text');

    } else {

      map.setPaintProperty(layer.id, 'circle-color', layer.paint['circle-color']);

      if (layer.filter) {
        map.setFilter(layer.id, layer.filter);
      } else {
        map.setFilter(layer.id);
      }
    }
    if (!map.getLayer('number-layer')) {
      this.addNumberLayer();
    }
    map.setPaintProperty('number-layer', 'text-color', layer.paint['circle-color']);
    map.setLayoutProperty('number-layer', 'text-field', layer.paint['circle-color'][2]);
  }

  setMapClusterLayers(layers, boxes, dateRange, pheno){
    if(layers){
      boxes = this.convertLastMeasurement(boxes);
      this.addClusterSource(boxes, pheno, this.map, dateRange);
      this.drawClusterLayers(layers, this.map, dateRange);
      
      this.map.setPaintProperty('cluster-hover-layer', 'circle-color', pheno['layer']['paint']['circle-color']);
      // console.log
    }
  }

  drawClusterLayers(layers, map, dateRange) {

    this.currentClusterLayers = layers;

    layers.forEach(layer => {

      if (!map.getLayer(layer.id)) {
        map.addLayer(layer);
        // if (map.getLayer('active-layer-text'))
        //   map.moveLayer(layer.id, 'active-layer-text');
  
      } else {
  
        map.setPaintProperty(layer.id, 'circle-color', layer.paint['circle-color']);
  
        if (layer.filter) {
          map.setFilter(layer.id, layer.filter);
        } else {
          map.setFilter(layer.id);
        }
      }
    });

    if (!map.getLayer('cluster-number-layer')) {
      this.addClusterNumberLayers();
    }
    let textField = ["concat", ['/',['round',[ '*', ['/', ["get", layers[0].paint['circle-color'][2][1][1]], ["get", "point_count"]], 100]],100], ""];
    map.setPaintProperty('no-cluster-number', 'text-color', layers[0].paint['circle-color']);
    map.setLayoutProperty('cluster-number-layer', 'text-field', textField);
    map.setLayoutProperty('no-cluster-number', 'text-field', layers[1].paint['circle-color'][2]);

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
        'visibility': 'none',
        "text-field": "",
        "text-variable-anchor": ["bottom"],
        "text-offset": [0, 1],
        "text-size": 15
      }
    }, 'base-layer');
  }

  addClusterNumberLayers(){

    this.map.addLayer({
      'id': 'cluster-number-layer',
      'type': 'symbol',
      'source': 'cluster-boxes',
      'filter':  ['has', 'point_count'],
        //     'all',
        //     // ["get", "Temperatur", ["object", ["get", "live"]]],
        //     // ['==', ['get', 'cluster'], true]
        //     ['has', 'point_count']
        //   ],
      "paint": {
        'text-color': "white"
      },
      "layout": {
        // "text-field": "TTTESSSTTT",
        "text-field": ["concat", ['/',['round',[ '*', ['/', ["get", "Temperatur"], ["get", "point_count"]], 100]],100], ""],
        "text-size": 15,
        'text-font': ['Montserrat Bold', 'Arial Unicode MS Bold'],
      }
    });
    
    this.map.addLayer({
      'id': 'no-cluster-number',
      'type': 'symbol',
      'source': 'cluster-boxes',
      'filter': ['!', ['has', 'point_count']],
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
        "text-field": ["get", "Temperatur", ["object", ["get", "live"]]],
        "text-variable-anchor": ["bottom"],
        "text-offset": [0, 1],
        "text-size": 15
      }
    });
  }

  setBaseLayerFilter(boxes) {
    this.oldFilter = this.map.getFilter('base-layer');
    this.map.setFilter('base-layer', ["match", ["get", "_id"], boxes, true, false]);
    this.map.setFilter('number-layer', ["match", ["get", "_id"], boxes, true, false]);
  }

  setSearchLayerFilter(boxes) {
    if(this.map && this.map.getLayer('base-layer') && boxes.length > 0){
      this.oldFilter = this.map.getFilter('base-layer');
      // this.map.setFilter('base-layer', ["match", ["get", "_id"], boxes, true, false]);
      this.map.setPaintProperty('base-layer', 'circle-opacity', ['match', ['get', '_id'], boxes, 1, 0.2]);
      this.map.setPaintProperty('base-layer', 'circle-stroke-opacity', ['match', ['get', '_id'], boxes, 1, 0.2]);
      // this.map.setPaintProperty('base-layer', 'circle-radius',  "interpolate",
      // ["exponential", 1],
      // ["zoom"],
      // 4, ["sqrt", ["*", ['match', ["get", '_id'], boxes, 100, 1]]],
      // 8, ["sqrt", ["*", ['match', ["get", '_id'], boxes, 1000, 1]]]);
      this.map.setFilter('number-layer', ["match", ["get", "_id"], boxes, true, false]);
    } else if(this.map && this.map.getLayer('base-layer')) {
      this.map.setPaintProperty('base-layer', 'circle-opacity', 1);
      this.map.setPaintProperty('base-layer', 'circle-stroke-opacity',1);
      
    }
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
  
  setThemeLight(dateRange) {
    if(dateRange){
      let steps = extractDateSteps(dateRange);
      steps.forEach(step => {
        this.map.off('mouseleave', 'boxes-no-cluster'+step.toISOString(), this.mouseLeaveFunction);
      })
    }
    this.map.off('mouseleave', 'base-layer', this.mouseLeaveFunction);
    this.map.off('mouseleave', 'boxes-no-cluster', this.mouseLeaveFunction);
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
  
  setThemeDark(dateRange) {
    if(dateRange){
      let steps = extractDateSteps(dateRange);
      steps.forEach(step => {
        this.map.off('mouseleave', 'boxes-no-cluster'+step.toISOString(), this.mouseLeaveFunction);
      })
    }
    this.map.off('mouseleave', 'base-layer', this.mouseLeaveFunction);
    this.map.off('mouseleave', 'boxes-no-cluster', this.mouseLeaveFunction);
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

  flyTo(coordinates){
    this.map.flyTo({center: coordinates, zoom: 13});
  }

  addSearchResultLayer(results, theme){
    if (results && results.length > 0) {
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
      if (!this.map.getSource('search')) {
        this.map.addSource('search', {
          type: "geojson",
          data: this.toGeoJson(results)
        });
      } else {
        this.map.getSource('search').setData(this.toGeoJson(results));
      }
      
      if (!this.map.getLayer('search-layer')) {
        this.map.addLayer({
          'id': 'search-layer',
          'type': 'circle',
          'source': 'search',
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

        // this.map.setFilter('active-layer', ["==", id, ["get", "_id"]]);
        // this.map.setFilter('active-layer-text', ["==", id, ["get", "_id"]]);
      }

    } else {
      if(this.map && this.map.getLayer('search-layer')){
        this.map.removeLayer('search-layer');
      }
    }
  }

  toggleLayerVisibility(layer){
    var visibility = this.map.getLayoutProperty(layer, 'visibility');
 
    if (visibility === 'visible') {
      this.map.setLayoutProperty(layer, 'visibility', 'none');
      // this.className = '';
    } else {
      // this.className = 'active';
      this.map.setLayoutProperty(layer, 'visibility', 'visible');
    }
  }

  setClustering(res){
    if(this.map.getLayer('base-layer')){
      this.map.setLayoutProperty('base-layer', 'visibility', res ? 'none' : 'visible' );
      this.map.setLayoutProperty('number-layer', 'visibility', res ? 'none' : 'visible' );
    }
    if(this.map.getLayer('boxes-cluster')){
      this.map.setLayoutProperty('boxes-no-cluster', 'visibility', res ? 'visible' : 'none' );
      this.map.setLayoutProperty('boxes-cluster', 'visibility', res ? 'visible' : 'none' );
      this.map.setLayoutProperty('cluster-number-layer', 'visibility', res ? 'visible' : 'none' );
      this.map.setLayoutProperty('no-cluster-number', 'visibility', res ? 'visible' : 'none' );
    }
  }

  removeDateLayer(date){
    this.map.setLayoutProperty('cluster'+date, 'visibility', 'none');
    this.map.setLayoutProperty('cluster-number-layer'+date, 'visibility', 'none');
    this.map.setLayoutProperty('no-cluster-number'+date, 'visibility', 'none');
    this.map.setLayoutProperty('boxes-no-cluster'+date, 'visibility', 'none');

  }
  addDateLayer(date){
    this.map.setLayoutProperty('cluster'+date, 'visibility', 'visible');
    this.map.setLayoutProperty('cluster-number-layer'+date, 'visibility', 'visible');
    this.map.setLayoutProperty('no-cluster-number'+date, 'visibility', 'visible');
    this.map.setLayoutProperty('boxes-no-cluster'+date, 'visibility', 'visible');
    
    this.map.setPaintProperty('cluster-hover-layer', 'circle-color', this.map.getPaintProperty('boxes-no-cluster'+date, 'circle-color'));

  }
}
