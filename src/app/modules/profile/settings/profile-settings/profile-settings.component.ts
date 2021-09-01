import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'osem-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  _user;

  @Input() set user(user){
    this._user = user;
    if(user){
      this.profileForm.patchValue(user);
    }
  };

  @Output() profileSaved = new EventEmitter();

  profileForm = this.builder.group({
    name: [''],
    email: [''],
    language: ['']
  }); 


  constructor(private builder: FormBuilder) { }

  ngOnInit() {
  }

  saveProfile(){
    this.profileSaved.emit(this.profileForm.getRawValue())
  }

}