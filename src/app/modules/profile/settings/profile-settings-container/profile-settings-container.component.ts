import { Component, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/models/session/state/session.query';
import { SessionService } from 'src/app/models/session/state/session.service';

@Component({
  selector: 'osem-profile-settings-container',
  templateUrl: './profile-settings-container.component.html',
  styleUrls: ['./profile-settings-container.component.scss']
})
export class ProfileSettingsContainerComponent implements OnInit {

  user$ = this.sessionQuery.user$;

  constructor(
    private sessionQuery: SessionQuery,
    private sessionService: SessionService) { }

  ngOnInit() {
  }

  saveProfile(data){
    this.sessionService.updateProfile(data);
  }
  
  deleteAccount(data){
    this.sessionService.deleteAccount(data);
  }

}
