import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appearPopup } from 'src/app/helper/animations';
import { sensorIcons } from 'src/app/helper/sensorIcons';

@Component({
  selector: 'osem-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [appearPopup]
})
export class PopupComponent implements OnInit {

  @Input() box;
  @Input() cluster;
  @Input() user;
  @Output() closed = new EventEmitter();

  public sensorIconsObject = sensorIcons;

  constructor(public router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  compareToOther(id){
    this.router.navigate(['compare'], {
      relativeTo: this.activatedRoute,
      queryParams: { id: [id]},
      queryParamsHandling: 'merge'
    });
  }

  compareToCurrent(id){
    this.router.navigate(['compare'], {
      relativeTo: this.activatedRoute,
      queryParams: { id: [this.activatedRoute.snapshot.firstChild.params.id, id]},
      queryParamsHandling: 'merge'
    });
    this.closePopup();
  }
  
  addToCompare(id){
    let ids = this.activatedRoute.snapshot.queryParams.id;
    if(!Array.isArray(ids)){
      ids = [ids]
    }
    ids = [...ids,id]
    this.router.navigate(['compare'],    {
      relativeTo: this.activatedRoute,
      queryParams: { id: ids},
      queryParamsHandling: 'merge'
    });
    this.closePopup();
  }
  
  removeFromCompare(id){
    let ids = this.activatedRoute.snapshot.queryParams.id;
    if(!Array.isArray(ids)){
      ids = [ids]
    }
    ids = ids.filter(item => item != id)
    
    this.router.navigate(['compare'], {
      relativeTo: this.activatedRoute,
      queryParams: { id: ids},
      queryParamsHandling: 'merge'
    });
    this.closePopup();
  }
  
  details(id){
    this.router.navigate(['/explore/' + id], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge'
    });
    this.closePopup();
  }
  
  selectClusterBox(box){
    if(this.router.url.indexOf('compare') != -1){
      this.addToCompare(box.properties._id)
    } else {
      this.details(box.properties._id);
    }
    this.closePopup();
  }

  closePopup(){
    this.closed.emit();
  }

  followBox(){
    this.router.navigate(
      [{outlets: {modal: 'follow-box'}}],
      {
        relativeTo: this.activatedRoute,
        queryParams: { boxId: this.box._id },
        queryParamsHandling: 'merge'
      }
    ); 

    this.closePopup();
    
  }

}
