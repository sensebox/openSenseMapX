import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Box } from 'src/app/models/box/state/box.model';
import { ActivatedRoute } from '@angular/router';
import { BoxService } from 'src/app/models/box/state/box.service';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { SensorService } from 'src/app/models/sensor/state/sensor.service';
import { SensorQuery } from 'src/app/models/sensor/state/sensor.query';
import { Sensor } from 'src/app/models/sensor/state/sensor.model';

@Component({
  selector: 'osem-box-container',
  templateUrl: './box-container.component.html',
  styleUrls: ['./box-container.component.scss']
})
export class BoxContainerComponent implements OnInit {

  activeBox$: Observable<Box>;
  displayBox: Box;
  selectedSensors$: Observable<Sensor[] | Sensor> = this.sensorQuery.selectActive();
  // selectedSensors = [];
  dateRange$ = this.boxQuery.selectDateRange$;
  dateRange;
  chartData;

  constructor(private activatedRoute: ActivatedRoute, private boxService: BoxService, private boxQuery: BoxQuery, private sensorService: SensorService, private sensorQuery: SensorQuery) { }

  ngOnInit() {
    console.log("INIIIIIIT")
    this.activeBox$ = this.boxQuery.selectActive();
    this.activeBox$.subscribe(data => {
      console.log(data);
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

    this.selectedSensors$.subscribe(data => {
      console.log(data);
      if(data instanceof Array) {
        console.log("ARRAY")
        this.chartData = data.map(sensor => {
          if(sensor.rawValues)
            return {"name": sensor.title, series: sensor.rawValues}
        })
      } else {
        console.log("NOARRAY")
      }
      // this.chartData = 
    })

  }

  addValue(data){
    // this.selectedSensor = data.sensorId;
    // this.selectedSensors.push(data);
    console.log("ADD")
    // this.sensorService.addActive(data.sensorId);
    if(this.dateRange){
      this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, this.dateRange[0].toISOString(), this.dateRange[1].toISOString()).subscribe();
    } else {
      this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
    }
  }

  selectValue(data) {
    // this.selectedSensor = data.sensorId;
    // this.selectedSensors.push(data.sensorId);
    // this.sensorService.setActive(data.sensorId);
    if(this.dateRange){
      this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, this.dateRange[0].toISOString(), this.dateRange[1].toISOString()).subscribe();
    } else {
      this.sensorService.getSingleSensorValues(data.boxId, data.sensorId, '2019-11-05T14:54:08.775Z', '2019-11-06T15:54:08.775Z').subscribe();
    }
  }
}
