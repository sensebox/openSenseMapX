import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'osem-my-boxes',
  templateUrl: './my-boxes.component.html',
  styleUrls: ['./my-boxes.component.scss']
})
export class MyBoxesComponent implements OnInit {

  @Input() boxes;

  constructor() { }

  ngOnInit() {
  }

}
