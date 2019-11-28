import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Box } from 'src/app/models/box/state/box.model';
import { ActivatedRoute } from '@angular/router';
import { BoxService } from 'src/app/models/box/state/box.service';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { SensorService } from 'src/app/models/sensor/state/sensor.service';
import { SensorQuery } from 'src/app/models/sensor/state/sensor.query';
import { Sensor } from 'src/app/models/sensor/state/sensor.model';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'osem-box-container',
  templateUrl: './box-container.component.html',
  styleUrls: ['./box-container.component.scss']
})
export class BoxContainerComponent implements OnInit {

  activeBox$: Observable<Box>;
  compareTo$ = this.boxQuery.selectCompareTo$;
  compareModus$ = this.boxQuery.selectCompareModus$;
  compareData;

  displayBox: Box;
  selectedSensors$ = this.sensorQuery.selectActive();
  selectedSensors = [];
  cachedSensors$ = this.sensorQuery.selectCachedSensors$;
  cachedSensors = [];

  // selectedSensors = [];
  dateRange$ = this.boxQuery.selectDateRange$;
  dateRange;
  chartData;

  constructor(private activatedRoute: ActivatedRoute, private boxService: BoxService, private boxQuery: BoxQuery, private sensorService: SensorService, private sensorQuery: SensorQuery) { }

  ngOnInit() {
    console.log("INIIIIIIT")
    this.activeBox$ = this.boxQuery.selectActiveWithUI();
    this.activeBox$.subscribe(data => {
      console.log(data);
      this.sensorService.setActive([]);
      this.displayBox = data;
    });

    this.dateRange$.subscribe(res => {
      this.dateRange = res;
    })

    this.activatedRoute.params.subscribe(params => {
      if(params.id){
        this.boxService.getSingleBox(params.id).subscribe();
        this.boxService.setActive(params.id);
      }
    });

    this.cachedSensors$.subscribe(data => {
      this.cachedSensors = data;
    })

    this.selectedSensors$.subscribe(data => {
      // console.log(data);
      this.selectedSensors = data;
      if(data instanceof Array) {
        // console.log("ARRAY")
        this.chartData = data.map(sensor => {
          if(sensor.rawValues)
            return {"name": sensor.title, series: sensor.rawValues}
        })
      } else {
        // console.log("NOARRAY")
      }
      // this.chartData = 
    });

    this.compareTo$.pipe(withLatestFrom(this.activeBox$)).subscribe(res => {
    
      if(res[0] && res[1]){
        //extract IDs from res[0] & res[1]
        
          this.boxQuery.selectBoxesWithSensorAndUI(
            [...res[0].map(box => box._id), res[1]._id]).subscribe(res => {
              console.log(res);
              this.compareData = this.combineData(res);
              
            });
      }
      // this.boxQuery.selectBoxesWithSensorAndUI()
    })

  }

  toggleValue(data){
    // this.selectedSensor = data.sensorId;
    // this.selectedSensors.push(data);
    console.log(this.cachedSensors);
    if(this.cachedSensors.indexOf(data.sensorId) === -1){
      this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
      // this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, this.dateRange[0].toISOString(), this.dateRange[1].toISOString()).subscribe();
    }
    console.log(this.selectedSensors.map(sensor => sensor._id));
    if(this.selectedSensors.map(sensor => sensor._id).indexOf(data.sensorId) === -1){
      console.log("TRUE")
      this.sensorService.setActive(data.sensorId);
    } else {
      this.sensorService.toggleActive(data.sensorId);
    }
    // this.sensorService.addActive(data.sensorId);
    // if(this.dateRange){
    //   // this.sensorService.toggleActive(data.sensorId);
    //   this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, this.dateRange[0].toISOString(), this.dateRange[1].toISOString()).subscribe();
    // } else {
    //   this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
    // }
  }

  toggleAddValue(data) {

      
    if(this.cachedSensors.indexOf(data.sensorId) === -1){
      this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
      // this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, this.dateRange[0].toISOString(), this.dateRange[1].toISOString()).subscribe();
    }

    this.sensorService.toggleActive(data.sensorId);
    // this.selectedSensor = data.sensorId;
    // this.selectedSensors.push(data.sensorId);
    // this.sensorService.setActive(data.sensorId);
    // if(this.dateRange){
    //   this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, this.dateRange[0].toISOString(), this.dateRange[1].toISOString()).subscribe();
    // } else {
    //   this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
    // }
  }

  toggleCompareModus(modus){
    this.boxService.setCompareModus(modus);
  }

  combineData(data){
    console.log(data);
    let sensorData = {};

    data.forEach(box => {
      box.sensors.forEach(sensor => {
        console.log(sensor);
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
    console.log(sensorData);
    return sensorData;
  }

  removeCompare(box){
    console.log(box);
    this.boxService.toggleCompareTo(box._id);
  }
}
