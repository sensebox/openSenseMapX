import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'osem-profile-boxes',
  templateUrl: './profile-boxes.component.html',
  styleUrls: ['./profile-boxes.component.scss']
})
export class ProfileBoxesComponent implements OnInit {

  @Input() boxes;

  constructor() { }

  ngOnInit() {
  }

}
