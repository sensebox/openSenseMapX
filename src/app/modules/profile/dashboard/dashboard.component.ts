import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'osem-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }


  navTo(route){
    this.router.navigate([
      // NOTE: No relative-path navigation is required because we are accessing
      // the parent's "activatedRoute" instance. As such, this will be executed
      // as if we were doing this in the parent view component.
      {
        outlets: {
          sidebar: [route]
        }
      }
    ],
      {
        relativeTo: this.activatedRoute.parent // <--- PARENT activated route.
      }
    );
    
  }

}
