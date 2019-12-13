import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { SensorQuery } from 'src/app/models/sensor/state/sensor.query';
import { SensorService } from 'src/app/models/sensor/state/sensor.service';
import { ActivatedRoute } from '@angular/router';
import { BoxService } from 'src/app/models/box/state/box.service';
import { withLatestFrom, ignoreElements } from 'rxjs/operators';
import { slideInOutAnimation } from 'src/app/helper/animations';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { Observable } from 'rxjs';

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
  // activeSensors$ = this.sensorQuery.selectActiveWithUI();
  cachedSensors$ = this.sensorQuery.selectCachedSensors$;
  activeSensorTypes$ = this.uiQuery.selectActiveSensorTypes$;
  activeSensorSub;
  activeRouteSub;
  cachedSensorsSub;
  chartData = [];
  colors$ = this.uiQuery.selectColors$;
  doCheck = false;
  activeSensorTypes = [];


  constructor(
    private boxQuery: BoxQuery, 
    private sensorQuery: SensorQuery, 
    private sensorService: SensorService,
    private activatedRoute: ActivatedRoute,
    private boxService: BoxService,
    private cd: ChangeDetectorRef,
    private uiQuery: UiQuery,
    private uiService: UiService) { }

  ngOnInit() {

    //subscribe to activeBoxsolo so this does not trigger when the box itself changes (e.g. data loaded)
    this.activeBoxSolo$.pipe(withLatestFrom(this.activeSensorTypes$, this.activeBox$)).subscribe(data => {
      if(data){
        // TODO: MUSS WOANDERS HIN
        console.log("NEW ACTIVE?!");
        if(data[2] && data[2].sensors.length > 0) {
          let sensorsToActive = [];
          
          data[2].sensors.forEach(res => {
            // console.log(this.activeSensorTypes);
            if(res){
              if(data[1].indexOf(res.title) != -1){
                sensorsToActive.push(res._id);
                // if(this.cachedSensors.indexOf(data._id) === -1){
                //   this.sensorService.getSingleSensorValues(res.boxes_id, res._id, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
                // }           
              }
            }
          })
          // console.log('ToActive', sensorsToActive);
          this.sensorService.setActive(sensorsToActive);
        } else {
          // this.displayBox = data;
        }
      }
    });

    //subscribe to sensorIds so this does not trigger when the sensor itself changes (e.g. data loaded)
    this.activeSensorSub = this.activeSensorIds$.pipe(withLatestFrom(this.activeSensors$)).subscribe(data => {
      if(data && data.length > 0){
        // console.log('data1',data[1]);
        this.uiService.setActiveSensorTypes([...new Set(data[1].map(sensor => sensor.title))]);
        data[1].forEach(sensor => {
          if(!sensor.hasData){
            this.sensorService.getSingleSensorValues(sensor.boxes_id, sensor._id, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
  
            // this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, this.dateRange[0].toISOString(), this.dateRange[1].toISOString()).subscribe();
          }
        })
        

      }
      // this.activeSensors$ = data;
      // console.log([...new Set(data.map(sensor => sensor.title))]);
      // this.chartData = 
    });

    this.activeSensors$.subscribe(sensors => {
      if(sensors instanceof Array) {
        // console.log("ARRAY")

        this.chartData = sensors.filter(sensor => sensor.rawValues).map(sensor => {
          if(sensor.rawValues){
            return {"name": sensor.title, "displayName": `${sensor.title} (${sensor.unit})`, series: sensor.rawValues}
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
    this.activeRouteSub = this.activatedRoute.params.subscribe(params => {
      if(params.id){
        // this.boxService.getSingleBox(params.id).subscribe();
        this.boxService.setActive(params.id);
        // this.sensorService.resetActive();
      }
    });

    // this.activeSensorTypes$.subscribe(res => {
    //   this.activeSensorTypes = res;
    //   this.cd.detectChanges();
    // })
    // this.cachedSensorsSub = this.activeSensors$.subscribe(res => {
    // })
  }

  ngOnDestroy(){
    this.activeSensorSub.unsubscribe();
    // this.cachedSensorsSub.unsubscribe();
    this.activeRouteSub.unsubscribe();
  }

  toggleValue(data){

    this.sensorService.setActive(data._id);
    // if(this.cachedSensors.indexOf(data._id) === -1){
      // this.sensorService.getSingleSensorValues(data.boxes_id, data._id, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
    // } 
    // // this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, this.dateRange[0].toISOString(), this.dateRange[1].toISOString()).subscribe();
    
    // if(this.selectedSensors.map(sensor => sensor._id).indexOf(data._id) === -1){
    //   // console.log("TRUE")
    //   this.sensorService.setActive(data._id);
    //   this.sensorService.setSelectedSensorTypes(data.title);
    // } else {
    //   this.sensorService.toggleActive(data._id);
    //   this.sensorService.toggleSelectedSensorTypes(data.title);
    // }
    
  }

  toggleAddValue(data){
    this.sensorService.setActiveMax(data._id);
  }

  changeColors(data){
    // this.colors = data;
    this.uiService.updateColors(data);
    //TODO: remove this somehow
    // console.log(data);
    // this.cd.detectChanges();
  }

}
