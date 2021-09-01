import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'osem-profile-boxes-edit-sensors',
  templateUrl: './profile-boxes-edit-sensors.component.html',
  styleUrls: ['./profile-boxes-edit-sensors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBoxesEditSensorsComponent implements OnInit {

  @Input() box;
  @Output() boxSaved = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  saveBox(box){
    this.boxSaved.emit(box);
  }
}
