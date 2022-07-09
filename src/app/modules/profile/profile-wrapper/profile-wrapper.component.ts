import { Component, OnInit } from '@angular/core';
import { BoxService } from 'src/app/models/box/state/box.service';

@Component({
  selector: 'osem-profile-wrapper',
  templateUrl: './profile-wrapper.component.html',
  styleUrls: ['./profile-wrapper.component.scss']
})
export class ProfileWrapperComponent implements OnInit {

  constructor(private boxService: BoxService) { }

  ngOnInit() {

    this.boxService.getMyBoxes();

  }

}
