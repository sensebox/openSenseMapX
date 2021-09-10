import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'osem-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() registered = new EventEmitter();

  registerForm = this.builder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    language: ['de_DE']
  })

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
  }

  register(){
    console.log(this.registerForm)
    if(this.registerForm.valid)
      this.registered.emit(this.registerForm.getRawValue())
  }

}
