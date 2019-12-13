import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoxSingleContainerComponent } from './modules/explore/box/box-single-container/box-single-container.component';
import { BoxCompareContainerComponent } from './modules/explore/box/box-compare-container/box-compare-container.component';


const routes: Routes = [
  {path: '', component: BoxSingleContainerComponent},
  {path: 'explore/:id', component: BoxSingleContainerComponent},
  {path: 'compare', component: BoxCompareContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
