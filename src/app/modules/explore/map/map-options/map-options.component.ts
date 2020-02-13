import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'osem-map-options',
  templateUrl: './map-options.component.html',
  styleUrls: ['./map-options.component.scss']
})
export class MapOptionsComponent implements OnInit {

  @Input() layers;
  @Input() visible;
  @Input() clustering;
  @Input() numbers;
  @Input() circles;

  @Output() visibilityToggled = new EventEmitter();
  @Output() clusteringToggled = new EventEmitter();
  @Output() numbersToggled = new EventEmitter();
  @Output() circlesToggled = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleMapOptions(){
    this.visibilityToggled.emit();
  }

  toggleClustering(){
    this.clusteringToggled.emit();
  }

  toggleNumbers(){
    this.numbersToggled.emit();
  }

  toggleCircles(){
    this.circlesToggled.emit();
  }
}
