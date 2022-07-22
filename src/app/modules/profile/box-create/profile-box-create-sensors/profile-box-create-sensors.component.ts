import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";

@Component({
  selector: "osem-profile-box-create-sensors",
  templateUrl: "./profile-box-create-sensors.component.html",
  styleUrls: ["./profile-box-create-sensors.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileBoxCreateSensorsComponent implements OnInit {
  @Input() set sensors(sensors) {
    if (sensors) {
      this.groupedSensors = this.groupByPhenomenon(sensors);
    }
  }

  groupedSensors = {};
  oldsensors = [];

  @Input() selectedSensors;
  @Input() selectedSensorElements;
  @Input() loading;
  @Input() phenomena;
  @Input() units;

  @Output() sensorSelected = new EventEmitter();
  @Output() sensorElementSelected = new EventEmitter();
  @Output() sensorElementsUpdated = new EventEmitter();
  @Output() phenoRemoved = new EventEmitter();

  constructor() {}

  ngOnInit() {
    console.log(this.phenomena);
    console.log("UNITS", this.units);
  }

  selectSensor(sensor) {
    this.sensorSelected.emit(sensor);
    // if(sensor.sensorElement.length === 1){
    //   console.log("ONE");
    //   this.sensorElementSelected.emit({sensor: sensor, sensorElement: sensor.sensorElement[0]});
    // }
  }

  addSensorElement(e, sensorElement) {
    // this.selectSensor(sensorElement.sensorElement);
    // e.stopPropagation();
    this.sensorElementSelected.emit(sensorElement);
  }

  checkForElement(sensor, element) {
    let res = this.selectedSensorElements.filter((ele) => {
      if (
        ele.sensor.sensor.value === sensor.sensor.value &&
        element.phenomena === ele.sensorElement.phenomenonId
      ) {
        return true;
      }
    });
    if (res && res.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  select(event, sensor, element) {
    let value = event.target.value;
    let newElements = this.selectedSensorElements.map((ele) => {
      if (
        ele.sensor.sensor.value === sensor.sensor.value &&
        element.phenomena === ele.sensorElement.phenomenonId
      ) {
        return { ...ele, sensorElement: { ...ele.sensorElement, unit: value } };
      } else {
        return ele;
      }
    });
    this.sensorElementsUpdated.emit(newElements);
    event.stopPropagation();
  }

  groupByPhenomenon(sensors) {
    let groupedSensors = {};

    for (let sensor of sensors) {
      if (sensor.elements) {
        for (let sensorElement of sensor.elements) {
          console.log(sensorElement);
          console.log(this.phenomena)
          if (groupedSensors[sensorElement.phenomenonId]) {
            groupedSensors[sensorElement.phenomenonId].push({
              ...sensorElement,
              sensor: sensor,
            });
          } else {
            groupedSensors[sensorElement.phenomenonId] = [
              { ...sensorElement, sensor: sensor },
            ];
          }
        }
      }
    }
    return groupedSensors;
  }

  togglePheno(item, pheno) {
    item.classList.toggle("visible");
    if (!item.classList.contains("visible")) {
      this.phenoRemoved.emit(pheno);
    } else {
      // autoselect if only one sensorElement available
      if (pheno.value.length === 1) {
        console.log(pheno);
        this.sensorElementSelected.emit({
          sensor: pheno.value[0].sensor,
          sensorElement: pheno.value[0],
        });
      }
    }
  }
}
