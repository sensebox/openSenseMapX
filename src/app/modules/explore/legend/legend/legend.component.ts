import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { legendAnimation } from 'src/app/helper/animations';

@Component({
  selector: 'osem-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
  animations: [legendAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendComponent implements OnInit {

  @Input() selectedPheno;
  @Input() gradient;
  @Input() legendVisible;

  @Output() legendToggled = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }
  
  toggleLegend(){
    this.legendToggled.emit();
  }

}
