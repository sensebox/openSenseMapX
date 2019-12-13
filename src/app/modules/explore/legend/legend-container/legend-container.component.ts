import { Component, OnInit } from '@angular/core';
import { UiQuery } from 'src/app/models/ui/state/ui.query';

@Component({
  selector: 'osem-legend-container',
  templateUrl: './legend-container.component.html',
  styleUrls: ['./legend-container.component.scss']
})
export class LegendContainerComponent implements OnInit {

  selectedPheno$ = this.uiQuery.selectSelectedPheno$;
  gradient = "";
  constructor(private uiQuery: UiQuery) { }

  ngOnInit() {

    this.selectedPheno$.subscribe((res:any) => {
      if(res.layer){
        this.gradient = '0deg';
        res.layer.paint['circle-color'].forEach((color, index) => {
          if(index > 3 && (index % 2) != 1){
            this.gradient += ',' + color ;

          }
        })
        // this.gradient = this.gradient.slice(0, -1);
      }
    })

  }

}
