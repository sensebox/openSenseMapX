import { Component, OnInit } from '@angular/core';
import { BoxService } from 'src/app/models/box/state/box.service';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { MapService } from '../../services/map.service';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { withLatestFrom } from 'rxjs/operators';
import { SensorQuery } from 'src/app/models/sensor/state/sensor.query';

@Component({
  selector: 'osem-base-map-container',
  templateUrl: './base-map-container.component.html',
  styleUrls: ['./base-map-container.component.scss']
})
export class BaseMapContainerComponent implements OnInit {

  constructor(
    private boxService: BoxService, 
    private boxQuery: BoxQuery, 
    private sensorQuery: SensorQuery, 
    private mapService: MapService,
    private uiQuery: UiQuery) { }

  boxes$ = this.boxQuery.selectBoxes();
  loading$ = this.boxQuery.selectLoading();
  loadingSensor$ = this.sensorQuery.selectLoading();
  // layers$ = this.uiQuery.select(ent => ent.layers);
  baseLayer$ = this.uiQuery.select(ent => ent.baseLayer);
  clusterLayers$ = this.uiQuery.select(ent => ent.clusterLayers);
  mapInit$ = this.boxQuery.selectMapInit$;
  dataInit$ = this.boxQuery.selectDataInit$;
  activeBox$ = this.boxQuery.selectActiveId();
  compareModus$ = this.boxQuery.selectCompareModus$;
  compareTo$ = this.boxQuery.selectCompareTo$;
  colors$ = this.uiQuery.selectColors$;
  theme$ = this.uiQuery.selectTheme$;
  searchResults$ = this.uiQuery.selectSearchResults$;
  selectedPheno$ = this.uiQuery.selectSelectedPheno$;
  clustering$ = this.uiQuery.selectClustering$;
  // selectedDate$ = this.uiQuery.selectSelectedDate$;

  ui$;

  boxSub;
  compareToSub;
  layerSub;
  activeSub;
  compareToFilterSub;
  colorSub;
  searchSub;
  clusterLayerSub;
  

  ngOnInit() {
    //GET ALL THE DATA
    this.boxService.get().subscribe();

    //SUBSCRIBE TO ALL BOXES and Layers after map is initiatet
    this.mapInit$.pipe(withLatestFrom(this.compareModus$)).subscribe(res => {
      if(res[0]){
        this.boxSub = this.boxes$.pipe(withLatestFrom(this.selectedPheno$)).pipe(withLatestFrom(this.clusterLayers$)).subscribe(res => {
          console.log("RES",res);
          if(res[0]) {
            this.mapService.setMapData(res[0][0], res[0][1], res[1]);  
          }
        });
        this.mapService.addPopup('base-layer');
        this.mapService.addClickFuntion('base-layer');
        this.mapService.addPopup('boxes-no-cluster');
        this.mapService.addClickFuntion('boxes-no-cluster');

        this.mapService.addClusterClickFunction('boxes-cluster');
        this.mapService.addHoverCluster('boxes-cluster');
        if(res[1]){
          this.mapService.setCompareModusClickFunctions();
        }
      }
    });
    
    //ADD LAYERS WHEN DATA IS INITIALISED
    this.dataInit$.subscribe(res => {
      if(res){
        if(this.layerSub)
          this.unsubscribeAll();
        this.layerSub = this.baseLayer$.subscribe(res => {
          this.mapService.setMapBaseLayer(res);
        });
        this.clusterLayerSub = this.clusterLayers$.pipe(withLatestFrom(this.boxes$)).subscribe(res => {
          this.mapService.setMapClusterLayers(res[0], res[1]);
        });
        this.activeSub = this.activeBox$.pipe(withLatestFrom(this.theme$)).subscribe(res => {
          if(res)
            this.mapService.updateActiveLayer(res[0], res[1]);
        });
        this.compareToSub = this.compareTo$.pipe(withLatestFrom(this.theme$)).subscribe(res => {
          if(res.length > 0)
            this.mapService.updateActiveLayerCompare(res[0], res[1]);
        });
        this.colorSub = this.colors$.pipe(withLatestFrom(this.theme$)).subscribe(res => {
          if(res[0]){
            this.mapService.colorActives(res[0], res[1]);
          }
        });
        this.clustering$.subscribe(res => {
          this.mapService.setClustering(res);
        })
      }
    })

    this.searchSub = this.searchResults$.subscribe(res => {
      this.mapService.setSearchLayerFilter(res.map(item => item._id));
      // this.mapService.addSearchResultLayer(res, 'light');
    });
  }

  unsubscribeAll(){
    this.boxSub.unsubscribe();
    this.layerSub.unsubscribe();
    this.activeSub.unsubscribe();
    this.compareToSub.unsubscribe();
    this.colorSub.unsubscribe();
    this.searchSub.unsubscribe();

  }

  ngOnDestroy(){
    this.unsubscribeAll();
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
