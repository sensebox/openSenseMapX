import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/models/session/state/session.service';

@Component({
  selector: 'osem-sidebar-menu-items',
  templateUrl: './sidebar-menu-items.component.html',
  styleUrls: ['./sidebar-menu-items.component.scss']
})
export class SidebarMenuItemsComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

  logout() {
    this.sessionService.logout();
  }

}
