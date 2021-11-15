import { Component, OnInit } from '@angular/core';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';

@Component({
  selector: 'osem-box-follow-container',
  templateUrl: './box-follow-container.component.html',
  styleUrls: ['./box-follow-container.component.scss']
})
export class BoxFollowContainerComponent implements OnInit {

  selectedPheno$ = this.uiQuery.selectSelectedPheno$;

  constructor(private uiQuery: UiQuery, private uiSerivce: UiService) { }

  ngOnInit() {
  }

  updateLegend(data) {
    this.uiSerivce.updateLegend(data);
  }

}
