import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { BoxService } from 'src/app/models/box/state/box.service';

@Component({
  selector: 'osem-profile-boxes-edit-general-container',
  templateUrl: './profile-boxes-edit-general-container.component.html',
  styleUrls: ['./profile-boxes-edit-general-container.component.scss']
})
export class ProfileBoxesEditGeneralContainerComponent implements OnInit {

  activeRouteSub;
  box$;

  constructor(
    private boxQuery: BoxQuery,
    private boxService: BoxService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    //SUBSCRIBE TO PARENT ROUTE PARAMS TO GET ID
    this.activeRouteSub = this.activatedRoute.parent.params.subscribe(params => {
      if(params.id){
        this.box$ = this.boxQuery.selectEntityWithSensor(params.id);
      } else {
        this.box$ = undefined;
      }
    });

  }

  ngOnDestroy(){
    this.activeRouteSub.unsubscribe();
  }

  saveBox(box){
    console.log(box);
    this.boxService.saveBox(box);
  }

}
