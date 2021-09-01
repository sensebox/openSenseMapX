import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BoxQuery } from 'src/app/models/box/state/box.query';

@Component({
  selector: 'osem-profile-boxes-edit-container',
  templateUrl: './profile-boxes-edit-container.component.html',
  styleUrls: ['./profile-boxes-edit-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBoxesEditContainerComponent implements OnInit {

  activeRouteSub;
  box$: Observable<any>;

  constructor(
    private boxQuery: BoxQuery,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activeRouteSub = this.activatedRoute.params.subscribe(params => {
      console.log(params);
      if(params.id){
        this.box$ = this.boxQuery.selectEntity(params.id);
        console.log(this.box$)
      } else {
        this.box$ = undefined;
      }
    });
  }

  ngOnDestroy(){
    this.activeRouteSub.unsubscribe();
  }

}
