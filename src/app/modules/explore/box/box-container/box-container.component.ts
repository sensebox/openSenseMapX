import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Box } from 'src/app/models/box/state/box.model';
import { ActivatedRoute } from '@angular/router';
import { BoxService } from 'src/app/models/box/state/box.service';
import { BoxQuery } from 'src/app/models/box/state/box.query';

@Component({
  selector: 'osem-box-container',
  templateUrl: './box-container.component.html',
  styleUrls: ['./box-container.component.scss']
})
export class BoxContainerComponent implements OnInit {

  activeBox$: Observable<Box>;
  displayBox: Box;
  selectedSensor;

  constructor(private activatedRoute: ActivatedRoute, private boxService: BoxService, private boxQuery: BoxQuery) { }

  ngOnInit() {
    
    this.activeBox$ = this.boxQuery.selectActive();
    this.activeBox$.subscribe(data => {
      this.displayBox = data;
    })

    this.activatedRoute.params.subscribe(params => {
      if(params.id){
        this.boxService.getSingleBox(params.id).subscribe();
        this.boxService.setActive(params.id);
      }
    })

  }

  selectValue(data) {
    this.selectedSensor = data.sensorId;
    this.boxService.getSingleBoxValues(data.boxId, data.sensorId, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
  }
}
