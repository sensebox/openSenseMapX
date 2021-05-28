import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'osem-base-map',
  templateUrl: './base-map.component.html',
  styleUrls: ['./base-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseMapComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.generateMap('map');
  }

}
