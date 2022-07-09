import { Component, OnInit } from '@angular/core';
import { BoxService } from 'src/app/models/box/state/box.service';
import { SessionQuery } from 'src/app/models/session/state/session.query';
import { SessionService } from 'src/app/models/session/state/session.service';

@Component({
  selector: 'osem-profile-boxes-container',
  templateUrl: './profile-boxes-container.component.html',
  styleUrls: ['./profile-boxes-container.component.scss']
})
export class ProfileBoxesContainerComponent implements OnInit {

  boxes$ = this.sessionQuery.selectMyBoxes();

  constructor(private sessionQuery: SessionQuery, private sessionService: SessionService, private boxService: BoxService) { }

  ngOnInit() {
  }

}
