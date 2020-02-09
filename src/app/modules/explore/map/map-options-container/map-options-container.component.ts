import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { UiService } from 'src/app/models/ui/state/ui.service';

@Component({
  selector: 'osem-map-options-container',
  templateUrl: './map-options-container.component.html',
  styleUrls: ['./map-options-container.component.scss']
})
export class MapOptionsContainerComponent implements OnInit {

  layers = ['base-layer', 'boxes-cluster', 'no-cluster-number', 'cluster-label', 'boxes-no-cluster']

  constructor(private mapService: MapService, private uiService: UiService) { }

  ngOnInit() {
  }

  toggleLayerVisibility(layer){
    this.mapService.toggleLayerVisibility(layer);
  }

  toggleClustering(){
    this.uiService.toggleClustering();
  }

}
