import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MapService } from '../../services/map.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UiQuery } from 'src/app/models/ui/state/ui.query';


@Component({
  selector: 'osem-base-map',
  templateUrl: './base-map.component.html',
  styleUrls: ['./base-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseMapComponent implements OnInit {

  drawmode$ = this.uiQuery.drawmode$;

  constructor(private mapService: MapService, public _router: Router,
    private activatedRoute: ActivatedRoute, private uiQuery: UiQuery) {}

  ngOnInit() {
    this.mapService.generateMap('map');

    this.drawmode$.subscribe(drawmode => { console.log("drawmode",drawmode);
    if(drawmode) {
      this.mapService.enableFunction()
    }
      else { this.mapService.disableFunction()}
    }
    );

  }

}
