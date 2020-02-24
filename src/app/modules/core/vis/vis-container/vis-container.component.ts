import { Component, OnInit } from '@angular/core';
import { VisQuery } from 'src/app/models/vis/state/vis.query';
import { VisService } from 'src/app/models/vis/state/vis.service';
import { MapService } from 'src/app/modules/explore/services/map.service';
import { Router } from '@angular/router';

@Component({
  selector: 'osem-vis-container',
  templateUrl: './vis-container.component.html',
  styleUrls: ['./vis-container.component.scss']
})
export class VisContainerComponent implements OnInit {

  vis$ = this.visQuery.selectAll();

  constructor(
    private visQuery: VisQuery, 
    private visService: VisService,
    private router: Router,
    private mapService: MapService) { }

  ngOnInit() {
    this.visService.get().subscribe();
  }

  selectVis(vis){
    this.mapService.fitBounds(vis.bbox);
    this.router.navigate([''],{
      queryParams: {
        fromDate: vis.dateRange[0],
        toDate: vis.dateRange[1],
        mapPheno: vis.pheno,
        bbox: vis.bbox
      }
    })
  }

}
