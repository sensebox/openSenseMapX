import { Component, OnInit } from '@angular/core';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { VisService } from 'src/app/models/vis/state/vis.service';
import { MapService } from '../../explore/services/map.service';

@Component({
  selector: 'osem-new-vis-container',
  templateUrl: './new-vis-container.component.html',
  styleUrls: ['./new-vis-container.component.scss']
})
export class NewVisContainerComponent implements OnInit {


  pheno$ = this.uiQuery.selectSelectedPheno$;
  dateRange$ = this.uiQuery.selectDateRange$;
  date$ = this.uiQuery.selectDateStamp$;
  filters$ = this.uiQuery.selectFilters$
  bbox;


  constructor(
    private visService: VisService, 
    private uiQuery: UiQuery, 
    private mapService: MapService) { }

  ngOnInit() {
    this.bbox = this.mapService.getBounds();
  }

  saveVis(vis){
    this.visService.createVis(vis);
  }

}
