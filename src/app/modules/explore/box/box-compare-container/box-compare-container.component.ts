import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxService } from 'src/app/models/box/state/box.service';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { combineLatest, Observable } from 'rxjs';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { map, withLatestFrom, mergeMap } from 'rxjs/operators';
import { SensorService } from 'src/app/models/sensor/state/sensor.service';
import { SensorQuery } from 'src/app/models/sensor/state/sensor.query';
import { arrayRemove } from '../../box/osem-line-chart/helper/helpers';

// Container component for comparing different boxes
@Component({
  selector: 'osem-box-compare-container',
  templateUrl: './box-compare-container.component.html',
  styleUrls: ['./box-compare-container.component.scss']
})
export class BoxCompareContainerComponent implements OnInit {

  combinedData;
  currentIds;
  chartData;
  currentActiveSensors;

  compareToWithSensors$ = this.boxQuery.selectCompareToWithSensors();
  compareTo$ = this.boxQuery.selectCompareTo$;
  activePhenos$ = this.uiQuery.selectActiveSensorTypes$;
  dateRange$ = this.uiQuery.selectDateRange$;
  dateRangeChart$ = this.uiQuery.selectDateRangeChart$;
  activeSensors$: Observable<any[]> = this.sensorQuery.selectActiveWithUI();
  activeSensorIds$ = this.sensorQuery.selectActiveId();
  selectedDate$ = this.uiQuery.selectSelectedDate$;
  colors$ = this.uiQuery.selectColors$;
  dataInit$ = this.boxQuery.selectDataInit$;
  sensorsLoading$ = this.sensorQuery.selectLoading();
  // selectedDate$ = this.uiQuery.selectSelectedDate$;
  
  sensorsPhenoSub;
  activeSensorSub;
  routeSub;

  constructor(
    private activatedRoute: ActivatedRoute,
    private boxService: BoxService,
    private boxQuery: BoxQuery,
    private uiService: UiService,
    private sensorService: SensorService,
    private sensorQuery: SensorQuery,
    private uiQuery: UiQuery,
    private router: Router) { }


  ngOnInit() {
    this.boxService.setCompareModus(true);

    this.routeSub = this.activatedRoute.queryParams.subscribe(res => {
      console.log(res);
      if(res.id){
        if(Array.isArray(res.id)){
          this.boxService.setCompareTo(res.id);
        } else {
          this.boxService.setCompareTo([res.id]);
        }
      }
      if(res.pheno)
        this.uiService.setActiveSensorTypes(res.pheno);
    });
    
    // this.dataInit$.subscribe(res => {
    //   if(res){
        this.compareToWithSensors$.subscribe(res => {
          if(res){
            if(this.currentIds != res.map(compareTo => compareTo._id)){
              this.currentIds = res.map(compareTo => compareTo._id);
              this.combinedData = this.combineData(res);
            }
          }
        });
    
        if(this.sensorsPhenoSub)
          this.sensorsPhenoSub.unsubscribe();

          // KEEPS ACTIVATED PHENOS OPEN (not needed now?)
        this.sensorsPhenoSub = combineLatest(this.compareToWithSensors$, this.activePhenos$).subscribe(res => {
          // TODO: THIS FIRES MANY TIMES for some reason when switching between dark and light mode and closing compare mode if not checking for length
          if(res[0] && res[0].length > 0 && res[1].length > 0){
            let sensorsToActive = res[0].map(box => {
              console.log(box)
              return box.sensors.filter(sensor => sensor.title === res[1])
            })
            sensorsToActive = [].concat(...sensorsToActive).map(sensor => sensor._id);
            if(sensorsToActive.length > 0){
              this.sensorService.setActive(sensorsToActive);
            } else {
              this.sensorService.setActive(null);
            }
          }
        })
    
        this.activeSensors$.subscribe(sensors => {
          if(sensors instanceof Array) {
            let localChartData = sensors.filter(sensor => sensor.rawValues && sensor.rawValues.length > 0).map(sensor => {
                return {
                  name: sensor.boxes_name, 
                  series: sensor.rawValues, 
                  extra: {  
                    title: sensor.title, 
                    displayName: `${sensor.title} (${sensor.unit})`
                  }
                }
            })
            this.chartData = localChartData;
          }
        })
    
        this.activeSensorSub = combineLatest(this.activeSensorIds$, this.dateRange$, this.dateRangeChart$).pipe(withLatestFrom(this.activeSensors$)).subscribe(data => {
          if(data && data.length > 0){
            let dateRange = data[0][1] ? data[0][1] : data[0][2]
            data[1].forEach(sensor => {
              if(!sensor.hasData){
                this.sensorService.getSingleSensorValues(sensor.boxes_id, sensor._id, dateRange[0], dateRange[1]).subscribe();
              }
            })
          }
        });
    //   }
    // })
  }

  combineData(data){
    let sensorData = {};

    data.forEach(box => {
      if(box.sensors){
        box.sensors.forEach(sensor => {
          if(sensor){
            if(sensorData[sensor.title]){
              sensorData[sensor.title][box._id] = {...sensor};
            } else {
              sensorData[sensor.title] = {};
              sensorData[sensor.title][box._id] = {...sensor};
            }
            if(box.values && box.values[sensor.title]){
              sensorData[sensor.title][box._id].values = box.values[sensor.title]
            }
          }
        })
      }
    });
    return sensorData;
  }

  selectPheno(pheno){
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { pheno: pheno.key },
        queryParamsHandling: 'merge'
      });
  }

  changeColors(data){
    this.uiService.updateColors(data);
  }

  removeBox(id){
    let newIds = [];
    if(this.activatedRoute.snapshot.queryParams.id){
      if(Array.isArray(this.activatedRoute.snapshot.queryParams.id)){
        if(this.activatedRoute.snapshot.queryParams.id.indexOf(id) != -1){
          newIds = arrayRemove(this.activatedRoute.snapshot.queryParams.id, id)
        } else {
          newIds = [...this.activatedRoute.snapshot.queryParams.id, id]
        }
      } else {
        if(this.activatedRoute.snapshot.queryParams.id === id){
          newIds = []
        } else {
          newIds = [this.activatedRoute.snapshot.queryParams.id, id]
        }
      }
    }
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { id: newIds },
        queryParamsHandling: 'merge'
      }
    );
  }

  closeCompare(){
    this.sensorsPhenoSub.unsubscribe();
    this.router.navigate(
      [''], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { id: [] },
        queryParamsHandling: 'merge'
      }
    );
  }

  ngOnDestroy(){
    this.sensorsPhenoSub.unsubscribe();
    this.routeSub.unsubscribe();
    this.boxService.setCompareModus(false);
  }

  changeDateRange(dateRange){
    this.sensorService.resetHasData();
    this.uiService.setDateRangeChart(dateRange);
  }
}
