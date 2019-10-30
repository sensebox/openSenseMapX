import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';
import { TouchSequence } from 'selenium-webdriver';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { LayerService } from 'src/app/services/layer/layer.service';
import { Observable } from 'rxjs';
import { Box } from 'src/app/models/box/state/box.model';
import { BoxService } from 'src/app/models/box/state/box.service';

@Component({
  selector: 'osem-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  boxes$: Observable<Box[]>;

  constructor(private mapService: MapService, private layerService: LayerService, private boxQuery: BoxQuery, private boxService: BoxService) { }

  layerExists = false;

  ngOnInit() {
    let that = this;
    this.mapService.generateMap('map');
    this.boxService.get().subscribe();
    this.boxes$ = this.boxQuery.selectAll();

    this.boxes$.subscribe(res => {
      if(res.length > 9 ){
        if(!this.layerExists){
          this.layerExists = true;
          setTimeout(function(){
            that.layerService.addPointLayer('boxes', res);
    
          }, 2000);
        } else {
          that.layerService.updateData('boxes', res);
        }
      }
    })
  }
}
