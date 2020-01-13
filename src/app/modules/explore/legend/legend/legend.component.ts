import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { legendAnimation } from 'src/app/helper/animations';

@Component({
  selector: 'osem-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
  animations: [legendAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendComponent implements OnInit, OnChanges {

  @Input() selectedPheno;
  @Input() gradient;
  @Input() legendVisible;

  @Output() legendToggled = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.selectedPheno);
  }

  toggleLegend(){
    this.legendToggled.emit();
  }

}
