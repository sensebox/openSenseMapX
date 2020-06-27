import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileWrapperComponent } from './profile-wrapper/profile-wrapper.component';
import { ProfileNavContainerComponent } from './profile-nav-container/profile-nav-container.component';
import { ProfileBoxesContainerComponent } from './profile-boxes-container/profile-boxes-container.component';
import { ProfileBoxCreateContainerComponent } from './profile-box-create-container/profile-box-create-container.component';


const routes: Routes = [
  {path: '', component: ProfileWrapperComponent, data: {name: 'Übersicht'}, children: [
    {path: 'boxes', component: ProfileBoxesContainerComponent, data: {name: 'Boxes'}},
    {path: 'newbox', component: ProfileBoxCreateContainerComponent, data: {name: 'New Box'}},
    {path: '', component: ProfileNavContainerComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
