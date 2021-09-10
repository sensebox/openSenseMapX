import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  @Output() accountDeleted = new EventEmitter();

  profileForm = this.builder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    language: [''],
    currentPassword: ['', Validators.required]
  }); 

  deleteForm = this.builder.group({
    password: ['', Validators.required]
  }); 


  constructor(private builder: FormBuilder) { }

  ngOnInit() {
  }

  saveProfile(){
    this.profileSaved.emit(this.profileForm.getRawValue())
  }

  deleteAccount(){
    if(this.deleteForm.valid)
      this.accountDeleted.emit(this.deleteForm.getRawValue())

  }

}
