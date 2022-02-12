import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MapService } from '../../explore/services/map.service';

@Component({
  selector: 'osem-share-vis',
  templateUrl: './share-vis.component.html',
  styleUrls: ['./share-vis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareVisComponent implements OnInit {

  constructor(private mapService: MapService) { }

  bbox;
  URL = 'https://opensensemap.org';

  ngOnInit() {
  }

  shareWebMap() {
    this.bbox = this.mapService.getBounds();
    console.log('BBOX', this.bbox);
    console.log('BBOX STRING', this.bbox.join());

    // this.URL = 'https://opensensemap.org/explore/5c4082821b7ca80019327adc';
    // this.URL = 'https://opensensemap.org/share/' + this.bbox.join();
    this.URL = 'http://localhost:4200/share/' + this.bbox.join();
    console.log('URL', this.URL);
  }

  shareVis() {
  }
}
