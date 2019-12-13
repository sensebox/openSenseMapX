import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'osem-testthisbitch',
  templateUrl: './testthisbitch.component.html',
  styleUrls: ['./testthisbitch.component.scss']
})
export class TestthisbitchComponent implements OnInit {

  @Input() activeSensorTypes;

  constructor() { }

  ngOnInit() {
  }

}
