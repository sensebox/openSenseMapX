import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { UiService } from 'src/app/models/ui/state/ui.service';

@Component({
  selector: 'osem-profile-boxes',
  templateUrl: './profile-boxes.component.html',
  styleUrls: ['./profile-boxes.component.scss']
})
export class ProfileBoxesComponent implements OnInit {

  @Input() set boxes(boxes) {
    if(boxes){
      this.sorted_boxes = boxes;
    }
  };

  sorting = 'desc';
  listStyle = 'boxes';
  sorted_boxes = [];

  constructor(private uiService: UiService) { }

  ngOnInit() {
  }

  showMyBoxesOnMap() {
    this.uiService.setFilterIds(this.boxes.map(box => box._id));
  }

  sort(direction){
    this.sorting = direction;
    if(direction === 'asc'){
      this.sorted_boxes = this.sorted_boxes.sort((a,b) => new Date(a.createdAt).getMilliseconds() - new Date(b.createdAt).getMilliseconds())
    } else {
      this.sorted_boxes = this.sorted_boxes.sort((a,b) => new Date(b.createdAt).getMilliseconds() - new Date(a.createdAt).getMilliseconds())
    }
  }

  setListStyle(style){
    this.listStyle = style;
  }

}
