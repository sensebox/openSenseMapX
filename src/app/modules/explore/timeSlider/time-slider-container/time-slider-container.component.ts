import { Component, OnInit } from '@angular/core';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { BoxService } from 'src/app/models/box/state/box.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'osem-time-slider-container',
  templateUrl: './time-slider-container.component.html',
  styleUrls: ['./time-slider-container.component.scss']
})
export class TimeSliderContainerComponent implements OnInit {

  dateRange$ = this.boxQuery.selectDateRange$;
  selectedDate$ = this.boxQuery.selectSelectedDate$;
  selectedPheno$ = this.boxQuery.selectSelectedPheno$;
  constructor(private boxQuery: BoxQuery, private boxService: BoxService) { }

  ngOnInit() { 
    combineLatest(this.selectedDate$, this.selectedPheno$).subscribe(res => {
      if(res[0] && res[1]){
        console.log(new Date(res[0]).toISOString());
        //deep clone
        let newLayer = JSON.parse(JSON.stringify(res[1].layer))
        console.log(newLayer);
        newLayer.filter = ["!=", null, [ "get", new Date(res[0]).toISOString(), ["object", ["get", res[1].title, ["object", ["get", "values"]]]]]];
        newLayer.paint['circle-color'][2] = [ "get", new Date(res[0]).toISOString(), ["object", ["get", res[1].title, ["object", ["get", "values"]]]]];
        this.boxService.setLayers([newLayer]);
      }
    });
  }

  dateSelected(date) {
    this.boxService.setSelectedDate(date);
  }

}
