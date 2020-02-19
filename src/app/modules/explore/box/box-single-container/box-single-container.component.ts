import { Component, OnInit, ChangeDetectorRef, HostListener, ContentChild, ElementRef } from '@angular/core';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { SensorQuery } from 'src/app/models/sensor/state/sensor.query';
import { SensorService } from 'src/app/models/sensor/state/sensor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxService } from 'src/app/models/box/state/box.service';
import { withLatestFrom, ignoreElements, combineAll } from 'rxjs/operators';
import { slideInOutAnimation } from 'src/app/helper/animations';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { Observable, zip, forkJoin, combineLatest } from 'rxjs';

//Container for displaying values of a single box
@Component({
  selector: 'osem-box-single-container',
  templateUrl: './box-single-container.component.html',
  styleUrls: ['./box-single-container.component.scss'],
  animations: [slideInOutAnimation]
})
export class BoxSingleContainerComponent implements OnInit {

  activeBox$ = this.boxQuery.selectActiveWithSensorAndUI();
  activeBoxSolo$ = this.boxQuery.selectActive();
  activeSensors$: Observable<any[]> = this.sensorQuery.selectActiveWithUI();
  activeSensorIds$ = this.sensorQuery.selectActiveId();
  cachedSensors$ = this.sensorQuery.selectCachedSensors$;
  activeSensorTypes$ = this.uiQuery.selectActiveSensorTypes$;
  dateRange$ = this.uiQuery.selectDateRange$;
  dateRangeChart$ = this.uiQuery.selectDateRangeChart$;
  selectedDate$ = this.uiQuery.selectSelectedDate$;

  activeSensorSub;
  activeRouteSub;
  cachedSensorsSub;
  chartData = [];
  colors$ = this.uiQuery.selectColors$;
  doCheck = false;
  activeSensorTypes = [];
  windowWidth = window.innerWidth;
  scrollDivWidth = 0;

  sensorsLoading$ = this.sensorQuery.selectLoading();

  @ContentChild('sensors', {static: false}) sensors: ElementRef;


  constructor(
    private boxQuery: BoxQuery, 
    private sensorQuery: SensorQuery, 
    private sensorService: SensorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private boxService: BoxService,
    private cdr: ChangeDetectorRef,
    private uiQuery: UiQuery,
    private uiService: UiService) { }

  ngOnInit() {

    //subscribe to activeBoxsolo so this does not trigger when the box itself changes (e.g. data loaded)
    this.activeBoxSolo$.pipe(withLatestFrom(this.activeSensorTypes$, this.activeBox$)).subscribe(data => {
      if(data){
        // TODO: MUSS WOANDERS HIN
        if(data[2] && data[2].sensors.length > 0) {
          let sensorsToActive = [];
          
          data[2].sensors.forEach(res => {
            if(res){
              if(data[1].indexOf(res.title) != -1){
                sensorsToActive.push(res._id);
              }
            }
          })
          this.sensorService.setActive(sensorsToActive);
        } else {
        }
      }
    });

    this.activeSensorSub = combineLatest(this.activeSensorIds$, this.dateRange$, this.dateRangeChart$).pipe(withLatestFrom(this.activeSensors$)).subscribe(res => {
      if(res && res.length > 0){
        let dateRange = res[0][1] ? res[0][1] : res[0][2];
        this.uiService.setActiveSensorTypes([...new Set(res[1].map(sensor => sensor.title))]);
        res[1].forEach(sensor => {
          if(!sensor.hasData){
            this.sensorService.getSingleSensorValues(sensor.boxes_id, sensor._id, dateRange[0], dateRange[1]).subscribe();
          }
        })
      }
    })
    //subscribe to sensorIds so this does not trigger when the sensor itself changes (e.g. data loaded)
    // this.activeSensorSub = this.activeSensorIds$.pipe(withLatestFrom(this.activeSensors$, this.dateRange$, this.dateRangeChart$)).subscribe(data => {
    //   if(data && data.length > 0){
    //     let dateRange = data[2] ? data[2] : data[3];
    //     this.uiService.setActiveSensorTypes([...new Set(data[1].map(sensor => sensor.title))]);
    //     data[1].forEach(sensor => {
    //       if(!sensor.hasData){
    //         console.log("GETTING DATA")
    //         this.sensorService.getSingleSensorValues(sensor.boxes_id, sensor._id, dateRange[0], dateRange[1]).subscribe();
    //       }
    //     })
    //   }
    // });

    this.activeSensors$.subscribe(sensors => {
      if(sensors instanceof Array) {
        this.chartData = sensors.filter(sensor => sensor.rawValues && sensor.rawValues.length > 0).map(sensor => {
          // if(sensor.rawValues.length > 0){
            return {
              name: sensor.title, 
              series: sensor.rawValues,
              extra: {
                title: sensor.title,
                displayName: `${sensor.title} (${sensor.unit})`, 
              }
            }
          // }
        })
      }
    })
    this.activeRouteSub = this.activatedRoute.params.subscribe(params => {
      if(params.id){
        this.boxService.setActive(params.id);
      } else {
        this.boxService.setActive(null);
      }
    });

  }

  ngOnDestroy(){
    this.activeSensorSub.unsubscribe();
    this.activeRouteSub.unsubscribe();
  }

  toggleValue(data){
    this.sensorService.setActive(data._id);
  }

  toggleAddValue(data){
    this.sensorService.setActiveMax(data._id);
  }

  changeColors(data){
    this.uiService.updateColors(data);
  }

  closeBox(){
    this.router.navigate([''],    {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge'
    });
  }

  changeScrollDivWidth(width){
    this.scrollDivWidth = width[0];
    this.windowWidth = width[1];
    this.cdr.detectChanges();
  }

  changeDateRange(dateRange){
    this.sensorService.resetHasData();
    this.uiService.setDateRangeChart(dateRange);
  }
}
