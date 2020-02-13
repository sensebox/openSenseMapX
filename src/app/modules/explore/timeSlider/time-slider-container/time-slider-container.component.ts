import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { Router, ActivatedRoute } from '@angular/router';
import { withLatestFrom } from 'rxjs/operators';
import { IntervalTimer } from '../../../../helper/IntervalTimer';
import { BoxQuery } from 'src/app/models/box/state/box.query';

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
  boxes$ = this.boxQuery.selectBoxes();
  selectedDate;
  selectedPheno;

  combineSub;

  step = 3600000;
  interval;
  intervalPlaying = false;

  constructor(
    private uiQuery: UiQuery, 
    private uiService: UiService,
    private boxQuery: BoxQuery,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() { 
    this.combineSub = this.selectedDate$.pipe(withLatestFrom(this.selectedPheno$)).subscribe(res => {
      if(res[1] != this.selectedPheno || (res[0] && res[0].getTime() != this.selectedDate)){
        if(res[0])
          this.selectedDate = res[0].getTime();
        if(res[1])
          this.selectedPheno = res[1];
        
        if(res[0] && res[1]){
          let newLayer = JSON.parse(JSON.stringify(res[1].layer))
          newLayer.filter = ["!=", null, [ "get", res[0].toISOString(), ["object", ["get", res[1].title, ["object", ["get", "values"]]]]]];
          newLayer.paint['circle-color'][2] = [ "get", res[0].toISOString(), ["object", ["get", res[1].title, ["object", ["get", "values"]]]]];
          this.uiService.updateBaseLayer(newLayer);
          // this.uiService.updateClusterLayer(res[0].toISOString());
          
        } else if(res[1] && !res[0] && this.selectedDate){
          let newLayer = JSON.parse(JSON.stringify(res[1].layer))
          newLayer.filter = [ "get", res[1].title, ["object", ["get", "live"]]];
          newLayer.paint['circle-color'][2] = [ "get", res[1].title, ["object", ["get", "live"]]];
          this.uiService.updateBaseLayer(newLayer);
        }
      }  
    })

    this.boxes$.pipe(withLatestFrom(this.selectedDate$)).pipe(withLatestFrom(this.selectedPheno$)).subscribe(res => {
      if(res[1]) {
        console.log(res);
        console.log("MAKE CLUSTER SOURCE HERE");
      }
    })

    this.dateRange$.subscribe(res => {
      this.interval = null;
    })
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

  play(){
    this.intervalPlaying = true;

    if(this.interval){
      this.interval.resume();
      return;
    }
    this.interval = new IntervalTimer('timeSlider', this.forward, 3000, 10, this);
    this.interval.start();
  }

  pause(){
    this.intervalPlaying = false;
    this.interval.pause();
  }

  backward(){
    this.uiService.setSelectedDate(new Date(this.selectedDate - this.step));
  }
  forward(that){
    that.uiService.setSelectedDate(new Date(that.selectedDate + that.step));
  }
}
