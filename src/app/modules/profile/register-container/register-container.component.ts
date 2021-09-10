import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/models/session/state/session.service';

@Component({
  selector: 'osem-register-container',
  templateUrl: './register-container.component.html',
  styleUrls: ['./register-container.component.scss']
})
export class RegisterContainerComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

  register(data){
    this.sessionService.register(data)
  }

}
