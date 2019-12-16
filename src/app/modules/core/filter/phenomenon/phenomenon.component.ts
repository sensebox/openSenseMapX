import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'osem-phenomenon',
  templateUrl: './phenomenon.component.html',
  styleUrls: ['./phenomenon.component.scss']
})
export class PhenomenonComponent implements OnInit {

  @Output() phenoSelected = new EventEmitter<String>();
  @Input() selectedPheno;

  phenos = [
    {
      title: 'Temperatur',
      layer: {
        'id': 'base-layer',
        'type': 'circle',
        'source': 'boxes',
        'filter': ["!=", null, [ "get", "Temperatur", ["object", ["get", "live"]]]],
        'paint': {
          'circle-radius': {
            'base': 1.75,
            'stops': [[1, 2], [22, 3080]]
          },
          'circle-color': [
            'interpolate',
          ['linear'],
          [ "get", "Temperatur", ["object", ["get", "live"]]],
          -5, '#9900cc',
          0, '#0000ff',
          10, '#0099ff',
          20, '#ffff00',
          30, '#ff0000'
          ]
        }
      },
      icon: "osem-thermometer",
    }, {
      title: 'rel. Luftfeuchte',
      layer : { 
        'id': 'base-layer',
        'type': 'circle',
        'source': 'boxes',
        'filter': ["!=", null, [ "get", "rel. Luftfeuchte", ["object", ["get", "live"]]]],
        'paint': {
          'circle-radius': {
            'base': 1.75,
            'stops': [[1, 2], [22, 3080]]
          },
          'circle-color': [
            'interpolate',
            ['linear'],
            [ "get", "rel. Luftfeuchte", ["object", ["get", "live"]]],
            0, '#9900cc',
            25, '#0000ff',
            50, '#0099ff',
            75, '#ffff00',
            100, '#ff0000',
          ]
        } 
      },
      icon: "osem-humidity"
    },
    { title: 'Beleuchtungsstärke', 
      layer: {
        'id': 'base-layer',
        'type': 'circle',
        'source': 'boxes',
        'filter': ["!=", null, [ "get", "Beleuchtungsstärke", ["object", ["get", "live"]]]],
        'paint': {
          'circle-radius': {
            'base': 1.75,
            'stops': [[1, 2], [22, 3080]]
          },
          'circle-color': [
            'interpolate',
          ['linear'],
          [ "get", "Beleuchtungsstärke", ["object", ["get", "live"]]],
          0, '#9900cc',
          300, '#0000ff',
          600, '#0099ff',
          900, '#ffff00',
          1200, '#ff0000',
          ]
        }
      },
      icon: "osem-brightness"
    },
    { title: 'UV-Intensität', 
      layer: {
        'id': 'base-layer',
        'type': 'circle',
        'source': 'boxes',
        'filter': ["!=", null, [ "get", "UV-Intensität", ["object", ["get", "live"]]]],
        'paint': {
          'circle-radius': {
            'base': 1.75,
            'stops': [[1, 2], [22, 3080]]
          },
          'circle-color': [
            'interpolate',
            ['linear'],
            [ "get", "UV-Intensität", ["object", ["get", "live"]]],
            -5, '#9900cc',
            0, '#0000ff',
            10, '#0099ff',
            20, '#ffff00',
            30, '#ff0000',
          ]
        }
      },
      icon: "osem-brightness"
    },
    { title: "PM10",
      layer: {
        'id': 'base-layer',
        'type': 'circle',
        'source': 'boxes',
        'filter': ["!=", null, [ "get", "PM10", ["object", ["get", "live"]]]],
        'paint': {
          'circle-radius': {
            'base': 1.75,
            'stops': [[1, 2], [22, 3080]]
          },
          'circle-color': [
            'interpolate',
            ['linear'],
            [ "get", "PM10", ["object", ["get", "live"]]],
            0, '#9900cc',
            15, '#0000ff',
            30, '#0099ff',
            45, '#ffff00',
            60, '#ff0000',
          ]
        }
      },
      icon: "osem-cloud"
    },
    { title: "PM2.5", 
      layer: {
        'id': 'base-layer',
        'type': 'circle',
        'source': 'boxes',
        'filter': ["!=", null, [ "get", "PM2.5", ["object", ["get", "live"]]]],
        'paint': {
          'circle-radius': {
            'base': 1.75,
            'stops': [[1, 2], [22, 3080]]
          },
          'circle-color': [
            'interpolate',
            ['linear'],
            [ "get", "PM2.5", ["object", ["get", "live"]]],
            0, '#9900cc',
            10, '#0000ff',
            20, '#0099ff',
            30, '#ffff00',
            40, '#ff0000',
          ]
        }
      },
      icon: "osem-cloud"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  selectPheno(pheno){
    this.phenoSelected.emit(pheno);
  }

}
