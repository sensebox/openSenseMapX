import { Component, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/models/session/state/session.query';

@Component({
  selector: 'osem-profile-settings-container',
  templateUrl: './profile-settings-container.component.html',
  styleUrls: ['./profile-settings-container.component.scss']
})
export class ProfileSettingsContainerComponent implements OnInit {

  user$ = this.sessionQuery.user$;

  constructor(private sessionQuery: SessionQuery) { }

  ngOnInit() {
  }

}
