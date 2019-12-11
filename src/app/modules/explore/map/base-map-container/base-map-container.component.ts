import { Component, OnInit } from '@angular/core';
import { BoxService } from 'src/app/models/box/state/box.service';
import { Observable } from 'rxjs';
import { Box } from 'src/app/models/box/state/box.model';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'osem-base-map-container',
  templateUrl: './base-map-container.component.html',
  styleUrls: ['./base-map-container.component.scss']
})
export class BaseMapContainerComponent implements OnInit {

  constructor(private boxService: BoxService, private boxQuery: BoxQuery, private mapService: MapService) { }

  boxes$ = this.boxQuery.selectBoxes();
  layers$ = this.boxQuery.select(ent => ent.ui.layers);
  mapInit$ = this.boxQuery.selectMapInit$;
  dataInit$ = this.boxQuery.selectDataInit$;
  activeBox$ = this.boxQuery.selectActiveId();
  ui$;

  boxSub;
  layerSub;
  activeSub;
  

  ngOnInit() {
    //GET ALL THE DATA
    this.boxService.get().subscribe();

    //SUBSCRIBE TO ALL BOXES and Layers after map is initiatet
    this.mapInit$.subscribe(res => {
      if(res){
        this.boxSub = this.boxes$.subscribe(res => {
          console.log("NEWDATA")
          if(res) {
            this.mapService.setMapData(res);  
          }
        });
        this.mapService.addPopup('base-layer');
        this.mapService.addClickFuntion('base-layer');
      }
    });
    
    this.dataInit$.subscribe(res => {
      if(res){
        this.layerSub = this.layers$.subscribe(res => { console.log(res); this.mapService.setMapLayers(res); });
        this.activeSub = this.activeBox$.subscribe(res => {
          if(res)
            this.mapService.updateActiveLayer(res);
        });        
      }
    })

    // this.boxService.get().subscribe();
    // this.boxes$ = this.boxQuery.selectAll();
    // this.ui$ = this.boxQuery.select(ent => ent.ui);

    // this.boxQuery.selectUI$.subscribe(res => console.log(res));
    // this.boxes$.subscribe(res => {console.log(res)});
    // this.ui$.subscribe(res => {console.log(res)});
    // console.log(this.boxQuery.select().subscribe(res => console.log(res)));
  }

  ngOnDestroy(){
    this.boxSub.unsubscribe();
    this.layerSub.unsubscribe();
    this.activeSub.unsubscribe();
  }

}