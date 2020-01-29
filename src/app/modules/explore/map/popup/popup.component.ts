import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'osem-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() box;

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
  }

  details(id){
    this.router.navigate(['/explore/' + id], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge'
    });
  }

}
