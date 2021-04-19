import { Component, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/models/session/state/session.query';
import { VisService } from 'src/app/models/vis/state/vis.service';

@Component({
  selector: 'osem-profile-vis-container',
  templateUrl: './profile-vis-container.component.html',
  styleUrls: ['./profile-vis-container.component.scss']
})
export class ProfileVisContainerComponent implements OnInit {

  vis$ = this.sessionQuery.selectMyVis();

  constructor(private visService: VisService, private sessionQuery: SessionQuery) { }

  ngOnInit() {
    this.visService.getMyVis()

    this.vis$.subscribe(res => {
      console.log("VIS", res);
    })
  }

  loadVis(vis){
    this.visService.loadVis(vis);
  }

}
