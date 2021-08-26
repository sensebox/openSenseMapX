import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'osem-profile-boxes-edit-security',
  templateUrl: './profile-boxes-edit-security.component.html',
  styleUrls: ['./profile-boxes-edit-security.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBoxesEditSecurityComponent implements OnInit, OnChanges {

  _box;

  @Input() set box(box){
    this._box = box;
    if(box){
      this.authForm.patchValue(box);
    }
  };

  @Output() boxSaved = new EventEmitter();
  @Output() tokenGenerated = new EventEmitter();

  authForm = this.builder.group({
    useAuth: [false, Validators.required],
    access_token: ['', Validators.required],
  }); 

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
  }
  
  ngOnChanges(){
  }

  saveBox(){
    this.boxSaved.emit({_id: this._box._id, useAuth: this.authForm.getRawValue().useAuth ? true : "false"})
  }

  generateNewToken(){
    this.tokenGenerated.emit(this._box._id);
  }

  revealPassword () {
    var passField:any = window.document.getElementById('auth-field');
    if (passField.type === 'password') {
      passField.type = 'text';
    } else {
      passField.type = 'password';
    }
  }
}
