import { Component, OnInit } from '@angular/core';
import { BoxService } from 'src/app/models/box/state/box.service';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'osem-popup-container',
  templateUrl: './popup-container.component.html',
  styleUrls: ['./popup-container.component.scss']
})
export class PopupContainerComponent implements OnInit {

  popupBox$ = this.boxQuery.selectPopupBox$;

  constructor(private boxQuery: BoxQuery, private mapService: MapService) { }

  mouseenter(){
    this.mapService.mouseEnterPopup();
  }
  mouseleave(){
    this.mapService.mouseLeavePopup();
  }
  
  ngOnInit() {
  }

}
