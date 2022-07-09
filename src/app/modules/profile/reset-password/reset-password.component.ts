import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/models/session/state/session.service';

@Component({
  selector: 'osem-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm = this.builder.group({
    email: ['', [Validators.email, Validators.required]] 
  })

  constructor(
    private builder: FormBuilder,
    private sessionService: SessionService) { }

  ngOnInit() {
  }

  resetPassword(){
    if(this.resetPasswordForm.valid)
      this.sessionService.resetPassword(this.resetPasswordForm.getRawValue())
  }

}
