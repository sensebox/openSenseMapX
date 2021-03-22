import { Component, OnInit } from '@angular/core';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';

@Component({
  selector: 'osem-legend-edit-container',
  templateUrl: './legend-edit-container.component.html',
  styleUrls: ['./legend-edit-container.component.scss']
})
export class LegendEditContainerComponent implements OnInit {

  selectedPheno$ = this.uiQuery.selectSelectedPheno$;

  constructor(private uiQuery: UiQuery, private uiSerivce: UiService) { }

  ngOnInit() {
  }

  updateLegend(data) {
    this.uiSerivce.updateLegend(data);
  }

}
