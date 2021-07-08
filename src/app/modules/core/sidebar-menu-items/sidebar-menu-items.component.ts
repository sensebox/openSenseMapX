import { Component, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/models/session/state/session.query';
import { SessionService } from 'src/app/models/session/state/session.service';

@Component({
  selector: 'osem-sidebar-menu-items',
  templateUrl: './sidebar-menu-items.component.html',
  styleUrls: ['./sidebar-menu-items.component.scss']
})
export class SidebarMenuItemsComponent implements OnInit {


  loggedIn$ = this.sessionQuery.isLoggedIn$;

  constructor(private sessionService: SessionService, private sessionQuery: SessionQuery) { }

  ngOnInit() {
  }

  logout() {
    this.sessionService.logout();
  }

}
