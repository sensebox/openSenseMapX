import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../core/services/validation.service';

@Component({
  selector: 'osem-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() registered = new EventEmitter();

  registerForm = this.builder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), ValidationService.userNameValidator]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    language: ['de_DE']
  }, {
    validator: ValidationService.MatchPassword
  });

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
  }

  register(){
    if(this.registerForm.valid)
      this.registered.emit(this.registerForm.getRawValue())
  }

}
