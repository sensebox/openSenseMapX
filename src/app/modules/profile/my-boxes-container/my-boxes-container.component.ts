import { Component, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/models/session/state/session.query';

@Component({
  selector: 'osem-my-boxes-container',
  templateUrl: './my-boxes-container.component.html',
  styleUrls: ['./my-boxes-container.component.scss']
})
export class MyBoxesContainerComponent implements OnInit {

  boxes$ = this.sessionQuery.selectMyBoxes();

  constructor(private sessionQuery: SessionQuery) { }

  ngOnInit() {

    this.boxes$.subscribe(res => {
      console.log(res);
    })
  }

}
