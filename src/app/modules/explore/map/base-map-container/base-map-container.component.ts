import { Component, OnInit } from '@angular/core';
import { UiQuery } from 'src/app/models/ui/state/ui.query';

// Container for the map Element. All function are in map.service
@Component({
  selector: 'osem-base-map-container',
  templateUrl: './base-map-container.component.html',
  styleUrls: ['./base-map-container.component.scss']
})
export class BaseMapContainerComponent implements OnInit {

  constructor(
    private uiQuery: UiQuery) { }

  mapLoading$ = this.uiQuery.select(ent => ent.mapLoading);

  
  ngOnInit() {
  }

  ngOnDestroy(){
    // this.unsubscribeAll();
  }

  // removeAllOtherBoxes(){
  //   if(!this.compareToFilterSub) {
  //     this.compareToFilterSub = this.compareTo$.subscribe(res => {
  //       this.mapService.setBaseLayerFilter(res);
  //     });
  //   } else {
  //     this.compareToFilterSub.unsubscribe();
  //     this.compareToFilterSub = undefined;
  //     this.mapService.resetBaseFilter();
  //   }
  // }

}
