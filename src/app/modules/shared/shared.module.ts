import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TranslateModule,
    LoadingComponent
  ]
})
export class SharedModule { }
