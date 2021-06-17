import { SessionService } from './../../../models/session/state/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'osem-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

  login(creds){
    this.sessionService.login(creds);
  }

}
