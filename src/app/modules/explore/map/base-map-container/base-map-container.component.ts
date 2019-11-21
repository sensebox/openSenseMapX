import { Component, OnInit } from '@angular/core';
import { BoxService } from 'src/app/models/box/state/box.service';
import { Observable } from 'rxjs';
import { Box } from 'src/app/models/box/state/box.model';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'osem-base-map-container',
  templateUrl: './base-map-container.component.html',
  styleUrls: ['./base-map-container.component.scss']
})
export class BaseMapContainerComponent implements OnInit {

  constructor(private boxService: BoxService, private boxQuery: BoxQuery) { }

  boxes$: Observable<Box[]>;
  ui$;
  

  ngOnInit() {
    // this.boxService.get().subscribe();
    // this.boxes$ = this.boxQuery.selectAll();
    // this.ui$ = this.boxQuery.select(ent => ent.ui);

    // this.boxQuery.selectUI$.subscribe(res => console.log(res));
    // this.boxes$.subscribe(res => {console.log(res)});
    // this.ui$.subscribe(res => {console.log(res)});
    // console.log(this.boxQuery.select().subscribe(res => console.log(res)));
  }

}
