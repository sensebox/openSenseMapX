import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileWrapperComponent } from './profile-wrapper/profile-wrapper.component';
import { ProfileNavContainerComponent } from './profile-nav-container/profile-nav-container.component';
import { ProfileBoxesContainerComponent } from './profile-boxes-container/profile-boxes-container.component';
import { ProfileBreadcrumbsComponent } from './profile-breadcrumbs/profile-breadcrumbs.component';
import { ProfileBoxesComponent } from './profile-boxes/profile-boxes.component';
import { ProfileBoxCreateContainerComponent } from './box-create/profile-box-create-container/profile-box-create-container.component';
import { ProfileBoxCreateDeviceComponent } from './box-create/profile-box-create-device/profile-box-create-device.component';
import { ProfileBoxCreateDeviceContainerComponent } from './box-create/profile-box-create-device-container/profile-box-create-device-container.component';
import { ProfileBoxCreateGeneralContainerComponent } from './box-create/profile-box-create-general-container/profile-box-create-general-container.component';
import { ProfileBoxCreateGeneralComponent } from './box-create/profile-box-create-general/profile-box-create-general.component';
import { ProfileBoxCreateSensorsContainerComponent } from './box-create/profile-box-create-sensors-container/profile-box-create-sensors-container.component';
import { ProfileBoxCreateSensorsComponent } from './box-create/profile-box-create-sensors/profile-box-create-sensors.component';
import { ProfileVisContainerComponent } from './profile-vis-container/profile-vis-container.component';
import { ProfileVisComponent } from './profile-vis/profile-vis.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { LoginComponent } from './login/login.component';
import { RegisterContainerComponent } from './register-container/register-container.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { MyBoxesContainerComponent } from './my-boxes-container/my-boxes-container.component';
import { MyBoxesComponent } from './my-boxes/my-boxes.component';
import { ProfileContainerComponent } from './profile-container/profile-container.component';
import { ProfileFollowedBoxesComponent } from './profile-followed-boxes/profile-followed-boxes.component';
import { ChartModule } from '@smart-webcomponents-angular/chart';
import { GridModule } from '@smart-webcomponents-angular/grid';
import { PivotTableModule } from '@smart-webcomponents-angular/pivottable';


@NgModule({
  declarations: [
    ProfileWrapperComponent, 
    ProfileNavContainerComponent, 
    ProfileBoxesContainerComponent, 
    ProfileBreadcrumbsComponent, 
    ProfileBoxesComponent, 
    ProfileBoxCreateContainerComponent, 
    ProfileBoxCreateDeviceComponent, 
    ProfileBoxCreateDeviceContainerComponent, 
    ProfileBoxCreateGeneralContainerComponent, 
    ProfileBoxCreateGeneralComponent, 
    ProfileBoxCreateSensorsContainerComponent, 
    ProfileBoxCreateSensorsComponent, 
    ProfileVisContainerComponent, 
    ProfileVisComponent,
    LoginContainerComponent,
    LoginComponent,
    RegisterContainerComponent,
    RegisterComponent,
    DashboardComponent,
    DashboardContainerComponent,
    MyBoxesContainerComponent,
    MyBoxesComponent,
    ProfileContainerComponent,
    ProfileFollowedBoxesComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ChartModule,
    GridModule,
    PivotTableModule
  ]
})
export class ProfileModule { }
