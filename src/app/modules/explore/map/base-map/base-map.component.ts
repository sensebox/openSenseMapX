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

  router:string = "happy";
  currentUrl = window.location.href;
  //drawmode$ = this.uiQuery.drawmode$;
  //data:any;
  my_url_var = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;
url: string;
  comparison:boolean = 'http://localhost:4200/(sidebar:m/create)'==this.currentUrl;

  previousUrl: string;

  constructor(private mapService: MapService, public _router: Router, private activatedRoute: ActivatedRoute, private uiQuery: UiQuery) {
    this._router.events.pipe(
      // identify navigation end
      filter((event) => event instanceof NavigationEnd))
      // now query the activated route
      .subscribe(event => {
        this
          console.log("event:",event);
          console.log("comparison:","NavigationEnd(id: 1, url: '/(sidebar:m/create)', urlAfterRedirects: '/(sidebar:m/create)')" === event.toString());
      });



  }

  ngOnInit() {

    console.log("current url:",this.currentUrl)
    console.log("comparison:", this.comparison)

    this.mapService.generateMap('map');
    //this.mapService.DrawControlMap();


  }

}
