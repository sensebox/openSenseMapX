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
import { ProfileBoxCreateAdvancedContainerComponent } from './box-create/profile-box-create-advanced-container/profile-box-create-advanced-container.component';
import { ProfileBoxCreateAdvancedComponent } from './box-create/profile-box-create-advanced/profile-box-create-advanced.component';
import { ProfileBoxCreateSummaryComponent } from './box-create/profile-box-create-summary/profile-box-create-summary.component';
import { ProfileBoxCreateSummaryContainerComponent } from './box-create/profile-box-create-summary-container/profile-box-create-summary-container.component';
import { ProfileBoxesEditContainerComponent } from './box-edit/profile-boxes-edit-container/profile-boxes-edit-container.component';
import { ProfileBoxesEditGeneralContainerComponent } from './box-edit/profile-boxes-edit-general-container/profile-boxes-edit-general-container.component';
import { ProfileBoxesEditGeneralComponent } from './box-edit/profile-boxes-edit-general/profile-boxes-edit-general.component';
import { ProfileBoxesEditSensorsContainerComponent } from './box-edit/profile-boxes-edit-sensors-container/profile-boxes-edit-sensors-container.component';
import { ProfileBoxesEditSensorsComponent } from './box-edit/profile-boxes-edit-sensors/profile-boxes-edit-sensors.component';
import { ProfileBoxesEditSecurityContainerComponent } from './box-edit/profile-boxes-edit-security-container/profile-boxes-edit-security-container.component';
import { ProfileBoxesEditSecurityComponent } from './box-edit/profile-boxes-edit-security/profile-boxes-edit-security.component';
import { ProfileBoxesEditAdvancedContainerComponent } from './box-edit/profile-boxes-edit-advanced-container/profile-boxes-edit-advanced-container.component';
import { ProfileBoxesEditAdvancedComponent } from './box-edit/profile-boxes-edit-advanced/profile-boxes-edit-advanced.component';
import { ProfileBoxesEditScriptContainerComponent } from './box-edit/profile-boxes-edit-script-container/profile-boxes-edit-script-container.component';
import { ProfileBoxesEditScriptComponent } from './box-edit/profile-boxes-edit-script/profile-boxes-edit-script.component';
import { ProfileSettingsContainerComponent } from './settings/profile-settings-container/profile-settings-container.component';
import { ProfileSettingsComponent } from './settings/profile-settings/profile-settings.component';
import { ChangePasswordContainerComponent } from './settings/change-password-container/change-password-container.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


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
    ProfileBoxCreateAdvancedContainerComponent,
    ProfileBoxCreateAdvancedComponent,
    ProfileBoxCreateSummaryComponent,
    ProfileBoxCreateSummaryContainerComponent,
    ProfileBoxesEditContainerComponent,
    ProfileBoxesEditGeneralContainerComponent,
    ProfileBoxesEditGeneralComponent,
    ProfileBoxesEditSensorsContainerComponent,
    ProfileBoxesEditSensorsComponent,
    ProfileBoxesEditSecurityContainerComponent,
    ProfileBoxesEditSecurityComponent,
    ProfileBoxesEditAdvancedContainerComponent,
    ProfileBoxesEditAdvancedComponent,
    ProfileBoxesEditScriptContainerComponent,
    ProfileBoxesEditScriptComponent,
    ProfileSettingsContainerComponent,
    ProfileSettingsComponent,
    ChangePasswordContainerComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProfileModule { }
