import { Component, OnInit } from '@angular/core';
import { BoxService } from 'src/app/models/box/state/box.service';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { MapService } from '../../services/map.service';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { withLatestFrom } from 'rxjs/operators';
import { SensorQuery } from 'src/app/models/sensor/state/sensor.query';
import { applyFilters } from '../../box/osem-line-chart/helper/helpers';
import { combineLatest } from 'rxjs';

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


  allBoxesPlain$ = this.boxQuery.selectAll();
  reloadMapData$ = this.uiQuery.selectReloadMapData$;
  boxes$ = this.boxQuery.selectBoxes();
  loading$ = this.boxQuery.selectLoading();
  loadingSensor$ = this.sensorQuery.selectLoading();
  // layers$ = this.uiQuery.select(ent => ent.layers);
  baseLayer$ = this.uiQuery.select(ent => ent.baseLayer);
  clusterLayers$ = this.uiQuery.select(ent => ent.clusterLayers);
  mapLoading$ = this.uiQuery.select(ent => ent.mapLoading);
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
  dateRange$ = this.uiQuery.selectDateRange$;
  filters$ = this.uiQuery.selectFilters$;
  selectedDate$ = this.uiQuery.selectSelectedDate$;

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
    // this.boxService.get().subscribe();

    //SUBSCRIBE TO ALL BOXES and Layers after map is initialised
    // this.mapInit$.pipe(withLatestFrom(this.compareModus$, this.selectedPheno$)).subscribe(res => {
      
    //   if(res[0]){   
       
    //     this.boxSub = combineLatest(this.boxes$, this.filters$).pipe(withLatestFrom(this.selectedPheno$, this.clusterLayers$, this.dateRange$)).subscribe(res => {
    //       if(res[0]) {
    //         let data = applyFilters(res[0][0], res[0][1]);
    //         this.mapService.setMapData(data, res[1], res[2], res[3]);  
    //       }
    //     });

    //     this.mapService.addPopup('base-layer');
    //     this.mapService.addClickFuntion('base-layer');
    //     this.mapService.addPopup('boxes-no-cluster');
    //     this.mapService.addClickFuntion('boxes-no-cluster');

    //     this.mapService.addClusterClickFunction('boxes-cluster');
    //     this.mapService.addHoverCluster('boxes-cluster', res[2]);
        
    //     if(res[1]){
    //       this.mapService.setCompareModusClickFunctions();
    //     }
    //   }
    // });
    
    // //ADD LAYERS WHEN DATA IS INITIALISED
    // this.dataInit$.subscribe(res => {
    //   if(res){
    //     if(this.layerSub)
    //       this.unsubscribeAll();
    //     this.layerSub = this.baseLayer$.subscribe(res => {
    //       this.mapService.setMapBaseLayer(res);
    //     });
    //     this.clusterLayerSub = combineLatest(this.clusterLayers$, this.filters$).pipe(withLatestFrom(this.boxes$, this.dateRange$, this.selectedPheno$)).subscribe(res => {
    //       // if(!res[1][1])
    //         this.mapService.setMapClusterLayers(res[0][0], applyFilters(res[1], res[0][1]), res[2], res[3]);
    //     });
    //     this.activeSub = this.activeBox$.pipe(withLatestFrom(this.theme$)).subscribe(res => {
    //       if(res)
    //         this.mapService.updateActiveLayer(res[0], res[1]);
    //     });
    //     this.compareToSub = this.compareTo$.pipe(withLatestFrom(this.theme$)).subscribe(res => {
    //       if(res.length > 0)
    //         this.mapService.updateActiveLayerCompare(res[0], res[1]);
    //     });
    //     this.colorSub = this.colors$.pipe(withLatestFrom(this.theme$)).subscribe(res => {
    //       if(res[0]){
    //         this.mapService.colorActives(res[0], res[1]);
    //       }
    //     });
    //     this.clustering$.pipe(withLatestFrom(this.selectedDate$)).subscribe(res => {
    //       this.mapService.setClustering(res[0], res[1]);
    //     })
    //   }
    // })

    // this.searchSub = this.searchResults$.subscribe(res => {
    //   this.mapService.setSearchLayerFilter(res.map(item => item._id));
    //   // this.mapService.addSearchResultLayer(res, 'light');
    // });
  }

  unsubscribeAll(){
    // this.boxSub.unsubscribe();
    // this.layerSub.unsubscribe();
    // this.activeSub.unsubscribe();
    // this.compareToSub.unsubscribe();
    // this.colorSub.unsubscribe();
    // this.searchSub.unsubscribe();

  }

  ngOnDestroy(){
    // this.unsubscribeAll();
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
