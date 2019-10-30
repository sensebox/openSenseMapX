import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BottomBoxComponent } from './components/containers/bottom-box/bottom-box.component';


const routes: Routes = [
  {path: '', component: BottomBoxComponent},
  {path: 'explore/:id', component: BottomBoxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
