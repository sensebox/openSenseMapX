import { Component, OnInit } from '@angular/core';
import { BoxService } from 'src/app/models/box/state/box.service';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { MapService } from '../../services/map.service';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { SessionQuery } from 'src/app/models/session/state/session.query';

@Component({
  selector: 'osem-popup-container',
  templateUrl: './popup-container.component.html',
  styleUrls: ['./popup-container.component.scss']
})
export class PopupContainerComponent implements OnInit {

  popupBox$ = this.boxQuery.selectPopupBox$;
  cluster$ = this.uiQuery.selectCluster$;
  user$ = this.sessionQuery.user$;

  box;
  constructor(
    private boxQuery: BoxQuery,
    private mapService: MapService, 
    private uiService: UiService,
    private uiQuery: UiQuery,
    private sessionQuery: SessionQuery
    ) { }

  mouseenter(){
    this.mapService.mouseEnterPopup(this.box);
  }
  mouseleave(){
    this.mapService.mouseLeavePopup();
  }
  
  ngOnInit() {
    this.popupBox$.subscribe(box => {
      this.box = box;
    })
  }

  closePopup(){
    //this.uiService.setCluster(null);
    this.mapService.mouseLeavePopup();
  }

}
