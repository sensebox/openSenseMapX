import { Component, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/models/session/state/session.query';

@Component({
  selector: 'osem-profile-boxes-container',
  templateUrl: './profile-boxes-container.component.html',
  styleUrls: ['./profile-boxes-container.component.scss']
})
export class ProfileBoxesContainerComponent implements OnInit {

  boxes$ = this.sessionQuery.selectMyBoxes();

  constructor(private sessionQuery: SessionQuery) { }

  ngOnInit() {
    this.boxes$.subscribe(res => {
      console.log(res);
    })
  }

}
