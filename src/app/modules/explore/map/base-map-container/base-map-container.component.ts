import { Component, OnInit } from '@angular/core';
import { BoxService } from 'src/app/models/box/state/box.service';
import { Observable } from 'rxjs';
import { Box } from 'src/app/models/box/state/box.model';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { MapService } from '../../services/map.service';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'osem-base-map-container',
  templateUrl: './base-map-container.component.html',
  styleUrls: ['./base-map-container.component.scss']
})
export class BaseMapContainerComponent implements OnInit {

  constructor(
    private boxService: BoxService, 
    private boxQuery: BoxQuery, 
    private mapService: MapService,
    private uiQuery: UiQuery) { }

  boxes$ = this.boxQuery.selectBoxes();
  layers$ = this.uiQuery.select(ent => ent.layers);
  baseLayer$ = this.uiQuery.select(ent => ent.baseLayer);
  mapInit$ = this.boxQuery.selectMapInit$;
  dataInit$ = this.boxQuery.selectDataInit$;
  activeBox$ = this.boxQuery.selectActiveId();
  compareModus$ = this.boxQuery.selectCompareModus$;
  compareTo$ = this.boxQuery.selectCompareTo$;
  colors$ = this.uiQuery.selectColors$;
  ui$;

  boxSub;
  compareToSub;
  layerSub;
  activeSub;
  compareToFilterSub;
  

  ngOnInit() {
    //GET ALL THE DATA
    this.boxService.get().subscribe();

    //SUBSCRIBE TO ALL BOXES and Layers after map is initiatet
    this.mapInit$.pipe(withLatestFrom(this.compareModus$)).subscribe(res => {
      console.log("mapInit");
      if(res[0]){
        this.boxSub = this.boxes$.subscribe(res => {
          if(res) {
            console.log(res);
            this.mapService.setMapData(res);  
          }
        });
        this.mapService.addPopup('base-layer');
        this.mapService.addClickFuntion('base-layer');
        if(res[1]){
          this.mapService.setCompareModusClickFunctions();
        }
      }
    });
    
    this.dataInit$.subscribe(res => {
      console.log("DATAINIT", res);
      if(res){
        this.layerSub = this.baseLayer$.subscribe(res => { 
          //convert to Array because drawLayers expects an array
          console.log("BASELAYER:", res);
          this.mapService.setMapLayers([res]); 
        });
        this.activeSub = this.activeBox$.subscribe(res => {
          if(res)
            this.mapService.updateActiveLayer(res);
        });
        this.compareToSub = this.compareTo$.subscribe(res => {
          if(res.length > 0)
            this.mapService.updateActiveLayerCompare(res);
        });
        this.colors$.subscribe(res => {
          console.log(res);
          if(res){
            // if(res.domain)
            this.mapService.colorActives(res);
          }
        })
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
    this.compareToSub.unsubscribe();
  }

  removeAllOtherBoxes(){
    if(!this.compareToFilterSub) {
      this.compareToFilterSub = this.compareTo$.subscribe(res => {
        this.mapService.setBaseLayerFilter(res);
      });
    } else {
      this.compareToFilterSub.unsubscribe();
      this.compareToFilterSub = undefined;
      this.mapService.resetBaseFilter();
    }
  }

}
