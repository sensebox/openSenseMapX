import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoxContainerComponent } from './modules/explore/box/box-container/box-container.component';


const routes: Routes = [
  {path: '', component: BoxContainerComponent},
  {path: 'explore/:id', component: BoxContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
