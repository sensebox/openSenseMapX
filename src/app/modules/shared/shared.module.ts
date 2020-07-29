import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingComponent } from './loading/loading.component';
import { FormInputComponent } from './form-input/form-input.component';
import { ControlMessageComponent } from './control-message/control-message.component';



@NgModule({
  declarations: [LoadingComponent, FormInputComponent, ControlMessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TranslateModule,
    LoadingComponent,
    ControlMessageComponent,
    FormInputComponent
  ]
})
export class SharedModule { }
