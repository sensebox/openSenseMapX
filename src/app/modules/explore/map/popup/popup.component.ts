import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'osem-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() box;

  constructor() { }

  ngOnInit() {
  }

}
