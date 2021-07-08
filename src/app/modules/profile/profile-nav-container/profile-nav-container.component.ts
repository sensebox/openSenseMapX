import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/models/session/state/session.service';
import { SessionQuery } from 'src/app/models/session/state/session.query';

@Component({
  selector: 'osem-profile-nav-container',
  templateUrl: './profile-nav-container.component.html',
  styleUrls: ['./profile-nav-container.component.scss']
})
export class ProfileNavContainerComponent implements OnInit {

  loggedIn$ = this.sessionQuery.isLoggedIn$;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private sessionService: SessionService,
    private sessionQuery: SessionQuery) { }

  ngOnInit() {
  }

  navTo(route){
    this.router.navigate(
      ['profile', 'boxes']
    );
  }

  logout(){
    this.sessionService.logout();
  }
}
