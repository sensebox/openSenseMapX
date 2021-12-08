import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { BoxService } from 'src/app/models/box/state/box.service';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'osem-box-follow-container',
  templateUrl: './box-follow-container.component.html',
  styleUrls: ['./box-follow-container.component.scss']
})
export class BoxFollowContainerComponent implements OnInit {

  activeBox$: Observable<any>;

  constructor(
    private uiQuery: UiQuery, 
    private uiSerivce: UiService,
    private activatedRoute: ActivatedRoute,
    private boxService: BoxService,
    private boxQuery: BoxQuery) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      this.boxService.getSingleBox(res.boxId).subscribe();
      this.boxService.setActive(res.boxId);
      this.activeBox$ = this.boxQuery.selectActiveWithSensorAndUI();
    });
  }

}
