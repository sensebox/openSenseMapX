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

  activeBox$: Observable<any>;
  compareTo$ = this.boxQuery.selectCompareTo$;
  compareModus$ = this.boxQuery.selectCompareModus$;
  compareData;

  displayBox: Box;
  selectedSensors$ = this.sensorQuery.selectActive();
  selectedSensors = [];
  cachedSensors$ = this.sensorQuery.selectCachedSensors$;
  cachedSensors = [];
  activeSensorTypes$ = this.sensorQuery.selectActiveSensorTypes$;
  activeSensorTypes = [];
  activeBoxLonely$;

  dateRange;
  chartData;

  constructor(
    private activatedRoute: ActivatedRoute,
    private boxService: BoxService,
    private boxQuery: BoxQuery,
    private sensorService: SensorService,
    private sensorQuery: SensorQuery) { }

  ngOnInit() {
    this.activeBox$ = this.boxQuery.selectActiveWithSensorAndUI();
    this.activeBoxLonely$ = this.boxQuery.selectActive();
    this.activeBoxLonely$.subscribe(res => {
      if(res){
        this.boxService.resetCompareTo();
      }
    })
    this.activeBox$.subscribe(data => {
      if(data){
        // TODO: MUSS WOANDERS HIN
        if(this.displayBox && this.displayBox._id != data._id) {
          this.displayBox = data;
          let sensorsToActive = [];
          
          data.sensors.forEach(res => {
            if(this.activeSensorTypes.indexOf(res.title) != -1){
              sensorsToActive.push(res._id);
              if(this.cachedSensors.indexOf(data._id) === -1){
                this.sensorService.getSingleSensorValues(res.boxes_id, res._id, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
              }           
            }
          })
          this.sensorService.setActive(sensorsToActive);
        } else {
          this.displayBox = data;
        }
      }
    });

    this.activatedRoute.params.subscribe(params => {
      if(params.id){
        this.boxService.getSingleBox(params.id).subscribe();
        this.boxService.setActive(params.id);
      }
    });
    this.activeSensorTypes$.subscribe(res => {
      this.activeSensorTypes = res;
    })

    this.cachedSensors$.subscribe(data => {
      this.cachedSensors = data;
    })

    this.selectedSensors$.subscribe(data => {
      this.selectedSensors = data;
      if(data instanceof Array) {
        // console.log("ARRAY")

        this.chartData = data.filter(sensor => sensor.rawValues).map(sensor => {
          console.log(sensor);
          if(sensor.rawValues){
            return {"name": sensor.title, series: sensor.rawValues}
          } else {
            return undefined
          }
        })
        // console.log(this.chartData)
      } else {
        // console.log("NOARRAY")
      }
      // this.chartData = 
    });

    this.compareTo$.pipe(withLatestFrom(this.activeBox$)).subscribe(res => {
      // console.log(res)
      if(res[0] && res[1]){
        //extract IDs from res[0] & res[1]
        
          this.boxQuery.selectBoxesWithSensorAndUI(
            [...res[0].map(box => box._id), res[1]._id])
              .subscribe(res => {
                // console.log(res);
                this.compareData = this.combineData(res);
                // console.log(this.compareData);
                
              });
      } 
      // this.boxQuery.selectBoxesWithSensorAndUI()
    })

  }

  toggleValue(data){
    // this.selectedSensor = data.sensorId;
    // this.selectedSensors.push(data);
    // console.log('TOGGLE DATA');

    if(data.key){
      data = data.value;
    }
    
    if(this.cachedSensors.indexOf(data._id) === -1){
      this.sensorService.getSingleSensorValues(data.boxes_id, data._id, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
    } 
    // this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, this.dateRange[0].toISOString(), this.dateRange[1].toISOString()).subscribe();
    
    // if(this.selectedSensors.map(sensor => sensor._id).indexOf(data._id) === -1){
    //   // console.log("TRUE")
    //   this.sensorService.setActive(data._id);
    //   this.sensorService.setSelectedSensorTypes(data.title);
    // } else {
    //   this.sensorService.toggleActive(data._id);
    //   this.sensorService.toggleSelectedSensorTypes(data.title);
    // }
    // this.sensorService.addActive(data.sensorId);
    // if(this.dateRange){
      //   // this.sensorService.toggleActive(data.sensorId);
      //   this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, this.dateRange[0].toISOString(), this.dateRange[1].toISOString()).subscribe();
      // } else {
        //   this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
        // }
      }
      
  toggleAddValue(data) {
    
    if(data.key){
      data = data.value;
      this.toggleAddValuePheno(data);
      return;
    }
    
    if(this.cachedSensors.indexOf(data._id) === -1){
      this.sensorService.getSingleSensorValues(data.boxes_id, data._id, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
      // this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, this.dateRange[0].toISOString(), this.dateRange[1].toISOString()).subscribe();
    }

    // if(this.activeSensorTypes.indexOf(data.title) === -1 && this.activeSensorTypes.length > 1){
    //   //TODO SHOW ERROR MESSAGE
    //   console.log("DOOO NOTHIGN BUT ERROR")
    // } else if (this.activeSensorTypes.indexOf(data.title) != -1) {
    //   this.sensorService.toggleActive(data._id);
    //   this.sensorService.toggleSelectedSensorTypes(data.title);    
    // } else {
    //   this.sensorService.toggleActive(data._id);
    //   this.sensorService.toggleSelectedSensorTypes(data.title);
    // }

  }

  toggleAddValuePheno(pheno){
    // console.log("PHEEEEENOOOOO", pheno);
    // let phenoName = pheno[Object.keys(pheno)[0]].title;
    // if(this.activeSensorTypes.indexOf(phenoName) === -1 && this.activeSensorTypes.length > 1){
    
    // } else {
    //   for(let key in pheno) {
    //     console.log(key);
    //     this.sensorService.getSingleSensorValues(key, pheno[key]._id, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
    //     this.sensorService.toggleActive(pheno[key]._id);
    //   }
    //   this.sensorService.toggleSelectedSensorTypes(phenoName);
    // }

  }

  toggleCompareModus(modus){
    this.boxService.setCompareModus(modus);
  }

  combineData(data){
    // console.log(data);
    let sensorData = {};

    data.forEach(box => {
      box.sensors.forEach(sensor => {
        // console.log(sensor);
        let name = sensor.boxes_id + sensor.title
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
    // console.log(sensorData);
    return sensorData;
  }

  removeCompare(box){
    // console.log(box);
    this.boxService.toggleCompareTo(box._id);
  }
}
