import { MyBoxesContainerComponent } from './modules/core/user/my-boxes-container/my-boxes-container.component';
import { AuthGuard } from './modules/core/services/auth-guard.service';
import { LoginContainerComponent } from './modules/core/user/login-container/login-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoxSingleContainerComponent } from './modules/explore/box/box-single-container/box-single-container.component';
import { BoxCompareContainerComponent } from './modules/explore/box/box-compare-container/box-compare-container.component';
import { ImpressumComponent } from './modules/core/impressum/impressum.component';
import { VisContainerComponent } from './modules/core/vis/vis-container/vis-container.component';
import { RegisterContainerComponent } from './modules/core/user/register-container/register-container.component';
import { DashboardContainerComponent } from './modules/core/user/dashboard-container/dashboard-container.component';
import { ProfileContainerComponent } from './modules/core/user/profile-container/profile-container.component';
import { LegendEditContainerComponent } from './modules/explore/legend/legend-edit-container/legend-edit-container.component';


const routes: Routes = [
  {path: '', component: BoxSingleContainerComponent, pathMatch: 'full'},
  {path: 'explore/:id', component: BoxSingleContainerComponent},
  {path: 'compare', component: BoxCompareContainerComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'about', component: ImpressumComponent},
  {path: 'vis', component: VisContainerComponent, outlet: 'modal'},
  {path: 'edit-legend', component: LegendEditContainerComponent, outlet: 'modal'},
  {path: 'login', component: LoginContainerComponent, outlet: 'sidebar'},
  {path: 'register', component: RegisterContainerComponent, outlet: 'sidebar'},
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    outlet: 'sidebar'  
  },
  {path: 'dashboard', component: ProfileContainerComponent, outlet: 'sidebar', canActivate: [AuthGuard], children: [
    {path: '', component: DashboardContainerComponent, canActivate: [AuthGuard], pathMatch: 'full'},
    {path: 'boxes', component: MyBoxesContainerComponent, canActivate: [AuthGuard]}
  ]
},
// {path: 'boxes', component: MyBoxesContainerComponent, outlet: 'sidebar', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
