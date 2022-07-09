import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/models/session/state/session.service';
import { ValidationService } from 'src/app/modules/core/services/validation.service';

@Component({
  selector: 'osem-change-password-container',
  templateUrl: './change-password-container.component.html',
  styleUrls: ['./change-password-container.component.scss']
})
export class ChangePasswordContainerComponent implements OnInit {


  changePasswordForm = this.builder.group({
    currentPassword : ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    newPasswordConfirmed: ['', [Validators.required, Validators.minLength(8)]]
  }, {
    validator: ValidationService.MatchPasswordNew
  });

  constructor(
    private builder: FormBuilder,
    private sessionService: SessionService) { }

  ngOnInit() {
  }

  changePassword(){
    if(this.changePasswordForm.valid)
      this.sessionService.updateProfile(this.changePasswordForm.getRawValue())
  }

}
