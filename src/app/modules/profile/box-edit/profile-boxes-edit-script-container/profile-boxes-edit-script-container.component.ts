import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoxQuery } from 'src/app/models/box/state/box.query';
import { BoxService } from 'src/app/models/box/state/box.service';

@Component({
  selector: 'osem-profile-boxes-edit-script-container',
  templateUrl: './profile-boxes-edit-script-container.component.html',
  styleUrls: ['./profile-boxes-edit-script-container.component.scss']
})
export class ProfileBoxesEditScriptContainerComponent implements OnInit {


  activeRouteSub;
  box$;

  constructor(
    private boxQuery: BoxQuery,
    private boxService: BoxService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

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

  generateScript(data){
    this.boxService.generateScript(data);
  }

  compileScript(data){
    this.boxService.compileScript(data);
  }

}
