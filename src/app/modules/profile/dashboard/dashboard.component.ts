import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'osem-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }


  navTo(route){
    this.router.navigate([
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
