import { Injectable } from '@angular/core';
import { Map, NavigationControl } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import { BoxService } from 'src/app/models/box/state/box.service';
import { Router } from '@angular/router';

// declare var mapboxgl: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map;

  constructor(private boxService: BoxService, private router: Router) { }

  generateMap(elementName) {
    (mapboxgl as typeof mapboxgl).accessToken = "pk.eyJ1IjoidW11dDAwIiwiYSI6ImNqbnVkbnFxNDB2YnIzd3M1eTNidTA3MjUifQ.3gqG1JYEQvckOiiQ8B3NQQ";
    this.map = new Map({
      container: elementName,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [13.5,52.4],
      zoom: 8,
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
      this.addPopup(data.id);
      this.addClickFuntion(data.id);
    }
  }

  addPopup(layer) {
    let that = this;

    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
       
    this.map.on('mouseenter', layer, function(e) {
    // Change the cursor style as a UI indicator.
      that.map.getCanvas().style.cursor = 'pointer';

        
      var coordinates = e.features[0].geometry.coordinates.slice();
        
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      let description = "<h3>" + e.features[0].properties.name + '</h3>' + e.features[0].properties.values

      let sensors = JSON.parse(e.features[0].properties.sensors);
      for(let sensor in sensors) {
        let sensorItem = sensors[sensor];
        description += '<p>' + sensorItem.title + '</p>'
      }
  
      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates)
        .setHTML(description)
        .addTo(that.map);
    });
      
    this.map.on('mouseleave', layer, function() {
      that.map.getCanvas().style.cursor = '';
      popup.remove();
    });
  }

  updateData(name, data) {
    console.log("changed")
    this.map.getSource(name).setData(data);
  }

  addClickFuntion(layer) {
    let that = this;
    this.map.on('click', layer, function (e) {
      // var coordinates = e.features[0].geometry.coordinates.slice();
      // var description = e.features[0].properties.description;
       
      console.log(e.features);
      if(e.features.length > 0){
        console.log(e.features[0].properties._id);
        that.router.navigate(['/explore/'+e.features[0].properties._id]);
        // that.boxService.setActive(e.features[0].properties._id);

      }
    });
  }
}
