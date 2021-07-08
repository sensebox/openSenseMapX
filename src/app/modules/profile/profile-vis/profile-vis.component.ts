import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'osem-profile-vis',
  templateUrl: './profile-vis.component.html',
  styleUrls: ['./profile-vis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileVisComponent implements OnInit {

  @Input() myVis;
  @Output() visLoaded = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  loadVis(vis){
    this.visLoaded.emit(vis);
  }

}
