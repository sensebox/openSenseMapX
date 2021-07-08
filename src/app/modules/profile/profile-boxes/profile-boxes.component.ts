import { Component, OnInit, Input } from '@angular/core';
import { UiService } from 'src/app/models/ui/state/ui.service';

@Component({
  selector: 'osem-profile-boxes',
  templateUrl: './profile-boxes.component.html',
  styleUrls: ['./profile-boxes.component.scss']
})
export class ProfileBoxesComponent implements OnInit {

  @Input() boxes;

  constructor(private uiService: UiService) { }

  ngOnInit() {
  }

  showMyBoxesOnMap() {
    this.uiService.setFilterIds(this.boxes.map(box => box._id));
  }

}
