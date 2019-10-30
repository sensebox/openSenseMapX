import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoxService } from 'src/app/models/box/state/box.service';
import { Observable } from 'rxjs';
import { Box } from 'src/app/models/box/state/box.model';
import { BoxQuery } from 'src/app/models/box/state/box.query';

@Component({
  selector: 'osem-bottom-box',
  templateUrl: './bottom-box.component.html',
  styleUrls: ['./bottom-box.component.scss']
})
export class BottomBoxComponent implements OnInit {

  activeBox$: Observable<Box>;
  displayBox: Box;

  constructor(private activatedRoute: ActivatedRoute, private boxService: BoxService, private boxQuery: BoxQuery) { }

  ngOnInit() {
    
    this.activeBox$ = this.boxQuery.selectActive();
    this.activeBox$.subscribe(data => {
      this.displayBox = data;
    })
    // this.activeBox$ = this.boxQuery.selectActive();
    this.activatedRoute.params.subscribe(params => {
      console.log(params.id);
      if(params.id){
        this.boxService.getSingleBox(params.id).subscribe();
        this.boxService.setActive(params.id);
      }
    })

  }

}
