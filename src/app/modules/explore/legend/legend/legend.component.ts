import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'osem-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit, OnChanges {

  @Input() selectedPheno;
  @Input() gradient;
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.selectedPheno);
  }

}
