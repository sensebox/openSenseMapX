import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { UiService } from 'src/app/models/ui/state/ui.service';

@Component({
  selector: 'osem-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

  @Input() exposure;
  // @Input() filter;
  @Input() user;
  @Output() exposureSet = new EventEmitter();
  @Output() filtersSet = new EventEmitter();

  @Input() filters;


  models = {
    'senseBox': [
      'homeV2Lora', 
      'homeV2Ethernet', 
      'homeV2EthernetFeinstaub', 
      'homeV2Wifi',
      'homeV2WifiFeinstaub',
      'homeEthernet',
      'homeWifi',
      'homeEthernetFeinstaub',
      'homeWifiFeinstaub'],
    'luftdaten.info': [
      'luftdaten_sds011',
      'luftdaten_sds011_dht11',
      'luftdaten_sds011_dht22',
      'luftdaten_sds011_bmp180',
      'luftdaten_sds011_bme280',
      'luftdaten_pms1003',
      'luftdaten_pms1003_bme280',
      'luftdaten_pms3003',
      'luftdaten_pms3003_bme280',
      'luftdaten_pms5003',
      'luftdaten_pms5003_bme280',
      'luftdaten_pms7003',
      'luftdaten_pms7003_bme280'
    ],
    'hackair': [
      'hackair_home_v2'
    ],
    'custom': [
      'custom'
    ]
  }

  constructor(private uiService: UiService) { }

  ngOnInit() {
  }

  // setFilter(){
  //   this.filterSet.emit();
  // }

  setExposure(exposure){
    this.filtersSet.emit({...this.filters, exposure: exposure});
  }

  setModel(model){
    this.filtersSet.emit({...this.filters, model: model});
  }

  setGroup(group){
    this.filtersSet.emit({...this.filters, group: group});
  }

  myBoxes(){
    console.log(this.user);
    this.uiService.setFilterIds(this.user.boxes);
  }

  allBoxes(){
    this.uiService.setFilterIds(null);
  }

  toggleModel(model){
    console.log(this.filters)
    let index = this.filters.model.indexOf(model);
    if(index === -1){
      this.filtersSet.emit({...this.filters, model: [...this.filters.model, model].concat(this.models[model])})
    } else {
      this.filters.model.splice(index, 1 + this.models[model].length)
      this.filtersSet.emit({...this.filters})
    }
  }

}
