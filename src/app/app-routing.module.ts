import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoxSingleContainerComponent } from './modules/explore/box/box-single-container/box-single-container.component';
import { BoxCompareContainerComponent } from './modules/explore/box/box-compare-container/box-compare-container.component';
import { ImpressumComponent } from './modules/core/impressum/impressum.component';
import { VisContainerComponent } from './modules/core/vis/vis-container/vis-container.component';


const routes: Routes = [
  {path: '', component: BoxSingleContainerComponent},
  {path: 'explore/:id', component: BoxSingleContainerComponent},
  {path: 'compare', component: BoxCompareContainerComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'about', component: ImpressumComponent},
  {path: 'vis', component: VisContainerComponent, outlet: 'modal'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
