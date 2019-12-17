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

@Component({
  selector: 'osem-box-compare-container',
  templateUrl: './box-compare-container.component.html',
  styleUrls: ['./box-compare-container.component.scss']
})
export class BoxCompareContainerComponent implements OnInit {

  phenos = [];
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
      console.log("new QUERY PARAMS", res)
      if(res.id)
        this.boxService.setCompareTo(res.id);
      if(res.pheno)
        this.uiService.setActiveSensorTypes(res.pheno);
    });
    
    this.compareToWithSensors$.subscribe(res => {
      console.log(res);
      if(this.currentIds != res.map(compareTo => compareTo._id)){
        this.currentIds = res.map(compareTo => compareTo._id);
        this.phenos = [];
        res.map(box => {
          box.sensors.forEach(sensor => {
            if(this.phenos.indexOf(sensor.title) === -1)
              this.phenos.push(sensor.title);
          });
        });
        this.combinedData = this.combineData(res);
      }
    });


    combineLatest(this.compareToWithSensors$, this.activePhenos$).pipe(map(res => {
      console.log('733333333333333333333',res);
      if(res[0] && res[1]){
        let sensorsToActive = res[0].map(box => box.sensors.filter(sensor => sensor.title === res[1]))
        sensorsToActive = [].concat(...sensorsToActive).map(sensor => sensor._id);
        // if(JSON.stringify(this.currentActiveSensors) != JSON.stringify(sensorsToActive)){
        //   console.log(sensorsToActive)
        //   this.currentActiveSensors = sensorsToActive;
        // }
        return sensorsToActive;
      }
    })).subscribe(res => {
      this.sensorService.setActive(res);
      console.log("SUB OF COMBINE", res);
    });
    // this.activatedRoute..subscribe(res => {
    //   console.log(res);
    // })

    this.activeSensors$.subscribe(sensors => {
      console.log(sensors);
      if(sensors instanceof Array) {
        // console.log("ARRAY")

        this.chartData = sensors.filter(sensor => sensor.rawValues).map(sensor => {
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
        // console.log(this.chartData);
        // console.log(this.chartData)
      } else {
        // console.log("NOARRAY")
      }
    })

    this.activeSensorSub = this.activeSensorIds$.pipe(withLatestFrom(this.activeSensors$, this.dateRange$, this.dateRangeChart$)).subscribe(data => {
      if(data && data.length > 0){
        console.log(data)
        let dateRange = data[2] ? data[2] : data[3]
        // console.log('data1',data[1]);
        // this.uiService.setActiveSensorTypes([...new Set(data[1].map(sensor => sensor.title))]);
        data[1].forEach(sensor => {
          if(!sensor.hasData){
            this.sensorService.getSingleSensorValues(sensor.boxes_id, sensor._id, dateRange[0], dateRange[1]).subscribe();
  
            // this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, this.dateRange[0].toISOString(), this.dateRange[1].toISOString()).subscribe();
          }
        })
        

      }
      // this.activeSensors$ = data;
      // console.log([...new Set(data.map(sensor => sensor.title))]);
      // this.chartData = 
    });


  }

  combineData(data){
    // console.log(data);
    let sensorData = {};

    data.forEach(box => {
      box.sensors.forEach(sensor => {
        // console.log(sensor);
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
    console.log("COMBINEDDATA: " ,sensorData);
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
    // this.colors = data;
    this.uiService.updateColors(data);
    //TODO: remove this somehow
    console.log("COLORS: ", data);
    // this.cd.detectChanges();
  }

}
