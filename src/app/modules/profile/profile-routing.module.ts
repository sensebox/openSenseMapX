import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileWrapperComponent } from './profile-wrapper/profile-wrapper.component';
import { ProfileNavContainerComponent } from './profile-nav-container/profile-nav-container.component';
import { ProfileBoxesContainerComponent } from './profile-boxes-container/profile-boxes-container.component';
import { ProfileBoxCreateContainerComponent } from './box-create/profile-box-create-container/profile-box-create-container.component';
import { ProfileBoxCreateDeviceContainerComponent } from './box-create/profile-box-create-device-container/profile-box-create-device-container.component';
import { ProfileBoxCreateGeneralContainerComponent } from './box-create/profile-box-create-general-container/profile-box-create-general-container.component';
import { ProfileBoxCreateSensorsContainerComponent } from './box-create/profile-box-create-sensors-container/profile-box-create-sensors-container.component';
import { ProfileVisContainerComponent } from './profile-vis-container/profile-vis-container.component';
import { ProfileBoxCreateAdvancedContainerComponent } from './box-create/profile-box-create-advanced-container/profile-box-create-advanced-container.component';
import { ProfileBoxCreateSummaryContainerComponent } from './box-create/profile-box-create-summary-container/profile-box-create-summary-container.component';
import { ProfileBoxesEditContainerComponent } from './box-edit/profile-boxes-edit-container/profile-boxes-edit-container.component';
import { ProfileBoxesEditGeneralContainerComponent } from './box-edit/profile-boxes-edit-general-container/profile-boxes-edit-general-container.component';
import { ProfileBoxesEditSensorsContainerComponent } from './box-edit/profile-boxes-edit-sensors-container/profile-boxes-edit-sensors-container.component';
import { ProfileBoxesEditSecurityContainerComponent } from './box-edit/profile-boxes-edit-security-container/profile-boxes-edit-security-container.component';
import { ProfileBoxesEditAdvancedContainerComponent } from './box-edit/profile-boxes-edit-advanced-container/profile-boxes-edit-advanced-container.component';
import { ProfileBoxesEditScriptContainerComponent } from './box-edit/profile-boxes-edit-script-container/profile-boxes-edit-script-container.component';
import { ProfileSettingsContainerComponent } from './settings/profile-settings-container/profile-settings-container.component';
import { ChangePasswordContainerComponent } from './settings/change-password-container/change-password-container.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  {path: '', component: ProfileWrapperComponent, data: {name: 'Profil'}, children: [
    {path: 'boxes', component: ProfileBoxesContainerComponent, data: {name: 'Boxes'}},
    {path: 'boxes/:id', component: ProfileBoxesEditContainerComponent, data: {name: 'Edit'}, children: [
      {path: '', redirectTo: 'general'},
      {path: 'general', component: ProfileBoxesEditGeneralContainerComponent, data: {name: "General"}},
      {path: 'sensors', component: ProfileBoxesEditSensorsContainerComponent, data: {name: "Sensors"}},
      {path: 'security', component: ProfileBoxesEditSecurityContainerComponent, data: {name: "Security"}},
      {path: 'advanced', component: ProfileBoxesEditAdvancedContainerComponent, data: {name: "Advanced"}},
      {path: 'script', component: ProfileBoxesEditScriptContainerComponent, data: {name: "Script"}},
    ]},    
    {path: 'newbox', component: ProfileBoxCreateContainerComponent, data: {name: 'New Box'}, children: [
      {path: '', redirectTo: 'device'},
      {path: 'device', component: ProfileBoxCreateDeviceContainerComponent},
      {path: 'general', component: ProfileBoxCreateGeneralContainerComponent},
      {path: 'sensors', component: ProfileBoxCreateSensorsContainerComponent},
      {path: 'advanced', component: ProfileBoxCreateAdvancedContainerComponent},
      {path: 'summary', component: ProfileBoxCreateSummaryContainerComponent},
    ]},
    {path: '', component: ProfileNavContainerComponent},
    {path: 'vis', component: ProfileVisContainerComponent, data: {name: 'Visulizations'}},
    {path: 'settings', component: ProfileSettingsContainerComponent, data: {name: 'Settings'}}, 
    {path: 'changepassword', component: ChangePasswordContainerComponent, data: {name: 'Change Password'}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
