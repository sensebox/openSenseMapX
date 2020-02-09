import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'osem-map-options',
  templateUrl: './map-options.component.html',
  styleUrls: ['./map-options.component.scss']
})
export class MapOptionsComponent implements OnInit {

  @Input() layers;
  @Output() visibilityToggled = new EventEmitter();
  @Output() clusteringToggled = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleVisibility(layer){
    this.visibilityToggled.emit(layer);
  }

  toggleClustering(){
    this.clusteringToggled.emit();
  }

}
