import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Map2Service } from '../../services/map2.service';

@Component({
  selector: 'osem-base-map',
  templateUrl: './base-map.component.html',
  styleUrls: ['./base-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseMapComponent implements OnInit {

  constructor(private mapService: Map2Service) { }

  ngOnInit() {
    this.mapService.generateMap('map');
  }

}
