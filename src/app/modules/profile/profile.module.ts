import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileWrapperComponent } from './profile-wrapper/profile-wrapper.component';
import { ProfileNavContainerComponent } from './profile-nav-container/profile-nav-container.component';
import { ProfileBoxesContainerComponent } from './profile-boxes-container/profile-boxes-container.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ProfileBreadcrumbsComponent } from './profile-breadcrumbs/profile-breadcrumbs.component';
import { ProfileBoxesComponent } from './profile-boxes/profile-boxes.component';
import { ProfileBoxCreateContainerComponent } from './profile-box-create-container/profile-box-create-container.component';
import { ProfileBoxCreateDeviceComponent } from './profile-box-create-device/profile-box-create-device.component';
import { ProfileBoxCreateDeviceContainerComponent } from './profile-box-create-device-container/profile-box-create-device-container.component';
import { ProfileBoxCreateGeneralContainerComponent } from './profile-box-create-general-container/profile-box-create-general-container.component';
import { ProfileBoxCreateGeneralComponent } from './profile-box-create-general/profile-box-create-general.component';
import { ProfileBoxCreateSensorsContainerComponent } from './profile-box-create-sensors-container/profile-box-create-sensors-container.component';
import { ProfileBoxCreateSensorsComponent } from './profile-box-create-sensors/profile-box-create-sensors.component';
import { ProfileVisContainerComponent } from './profile-vis-container/profile-vis-container.component';
import { ProfileVisComponent } from './profile-vis/profile-vis.component';


@NgModule({
  declarations: [ProfileWrapperComponent, ProfileNavContainerComponent, ProfileBoxesContainerComponent, ProfileBreadcrumbsComponent, ProfileBoxesComponent, ProfileBoxCreateContainerComponent, ProfileBoxCreateDeviceComponent, ProfileBoxCreateDeviceContainerComponent, ProfileBoxCreateGeneralContainerComponent, ProfileBoxCreateGeneralComponent, ProfileBoxCreateSensorsContainerComponent, ProfileBoxCreateSensorsComponent, ProfileVisContainerComponent, ProfileVisComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProfileModule { }
