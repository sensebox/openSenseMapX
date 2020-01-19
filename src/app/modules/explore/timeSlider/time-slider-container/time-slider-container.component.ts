import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'osem-time-slider-container',
  templateUrl: './time-slider-container.component.html',
  styleUrls: ['./time-slider-container.component.scss']
})
export class TimeSliderContainerComponent implements OnInit {

  dateRange$ = this.uiQuery.selectDateRange$;
  selectedDate$ = this.uiQuery.selectSelectedDate$;
  selectedPheno$ = this.uiQuery.selectSelectedPheno$;
  filterVisible$ = this.uiQuery.selectFilterVisible$;
  selectedDate;
  selectedPheno;

  combineSub;

  constructor(
    private uiQuery: UiQuery, 
    private uiService: UiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() { 
    this.combineSub = combineLatest(this.selectedDate$, this.selectedPheno$).subscribe(res => {
      
      if(res[1] != this.selectedPheno || (res[0] && res[0].getTime() != this.selectedDate)){
        console.log("SELECTEDDATA AND PHENOOOO")
        console.log(res[0] == this.selectedDate)
        console.log(res[1] == this.selectedPheno)
        if(res[0])
          this.selectedDate = res[0].getTime();
        if(res[1])
          this.selectedPheno = res[1];
        
        if(res[0] && res[1]){
          console.log("HELLO 111111")
          let newLayer = JSON.parse(JSON.stringify(res[1].layer))
          newLayer.filter = ["!=", null, [ "get", res[0].toISOString(), ["object", ["get", res[1].title, ["object", ["get", "values"]]]]]];
          newLayer.paint['circle-color'][2] = [ "get", res[0].toISOString(), ["object", ["get", res[1].title, ["object", ["get", "values"]]]]];
          this.uiService.updateBaseLayer(newLayer);
  
        } else if(res[1] && !res[0] && this.selectedDate){
          console.log("HELLO ???")
          let newLayer = JSON.parse(JSON.stringify(res[1].layer))
          newLayer.filter = [ "get", res[1].title, ["object", ["get", "live"]]];
          newLayer.paint['circle-color'][2] = [ "get", res[1].title, ["object", ["get", "live"]]];
          this.uiService.updateBaseLayer(newLayer);
        }
      }
    });
  }

  ngOnDestroy(){
    this.combineSub.unsubscribe();
  }

  dateSelected(date) {
    this.uiService.setSelectedDate(date);
  }

  removeDateRange(){
    const { fromDate, toDate, ...newQueryParams} = this.activatedRoute.snapshot.queryParams;
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: newQueryParams
      }
    );
  }
}
