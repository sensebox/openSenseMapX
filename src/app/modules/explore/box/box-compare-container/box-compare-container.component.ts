import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxService } from 'src/app/models/box/state/box.service';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { combineLatest, Observable } from 'rxjs';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { map, withLatestFrom } from 'rxjs/operators';
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
  
  sensorsPhenoSub;
  activeSensorSub;

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

    this.activatedRoute.queryParams.subscribe(res => {
      if(res.id){
        this.boxService.setCompareTo(res.id);
      }
      if(res.pheno)
      this.uiService.setActiveSensorTypes(res.pheno);
    });
    
    this.dataInit$.subscribe(res => {
      if(res){
        this.compareToWithSensors$.subscribe(res => {
          if(this.currentIds != res.map(compareTo => compareTo._id)){
            this.currentIds = res.map(compareTo => compareTo._id);
            this.combinedData = this.combineData(res);
          }
        });
    
        this.sensorsPhenoSub = combineLatest(this.compareToWithSensors$, this.activePhenos$).pipe(map(res => {
          if(res[0] && res[1]){
            let sensorsToActive = res[0].map(box => box.sensors.filter(sensor => sensor.title === res[1]))
            sensorsToActive = [].concat(...sensorsToActive).map(sensor => sensor._id);
            return sensorsToActive;
          }
        })).subscribe(res => {
          this.sensorService.setActive(res);
        });
    
        this.activeSensors$.subscribe(sensors => {
          if(sensors instanceof Array) {
            let localChartData = sensors.filter(sensor => sensor.rawValues).map(sensor => {
              if(sensor.rawValues){
                return {
                  name: sensor.boxes_id, 
                  series: sensor.rawValues, 
                  extra: {  
                    title: sensor.title, 
                    displayName: `${sensor.title} (${sensor.unit})`
                  }
                }
              } else {
                return undefined
              }
            })
            this.chartData = localChartData;
          } else {
          }
        })
    
        this.activeSensorSub = this.activeSensorIds$.pipe(withLatestFrom(this.activeSensors$, this.dateRange$, this.dateRangeChart$)).subscribe(data => {
          if(data && data.length > 0){
            let dateRange = data[2] ? data[2] : data[3]
            data[1].forEach(sensor => {
              if(!sensor.hasData){
                this.sensorService.getSingleSensorValues(sensor.boxes_id, sensor._id, dateRange[0], dateRange[1]).subscribe();
              }
            })
          }
        });
      }
    })


  }

  combineData(data){
    let sensorData = {};

    data.forEach(box => {
      box.sensors.forEach(sensor => {
        if(sensor){
          if(sensorData[sensor.title]){
            sensorData[sensor.title][box._id] = sensor;
          } else {
            sensorData[sensor.title] = {};
            sensorData[sensor.title][box._id] = sensor;
          }
        }
      })
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
    this.router.navigate(['']);
  }

  ngOnDestroy(){
    this.sensorsPhenoSub.unsubscribe();
    this.boxService.setCompareModus(false);
  }

}
