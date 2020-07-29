import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'osem-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {

  active = false;

  @Input() control;
  @Input() label;
  @Input() controlName;
  @Input() typeString;
  @Input() model;

  constructor() { }

  ngOnInit() {
  }

  enter() {
    this.active = true;
  }

  leave() {
    this.active = false;
  }

}
