import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileWrapperComponent } from './profile-wrapper/profile-wrapper.component';
import { ProfileNavContainerComponent } from './profile-nav-container/profile-nav-container.component';
import { ProfileBoxesContainerComponent } from './profile-boxes-container/profile-boxes-container.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ProfileBreadcrumbsComponent } from './profile-breadcrumbs/profile-breadcrumbs.component';
import { ProfileBoxesComponent } from './profile-boxes/profile-boxes.component';
import { ProfileBoxCreateComponent } from './profile-box-create/profile-box-create.component';
import { ProfileBoxCreateContainerComponent } from './profile-box-create-container/profile-box-create-container.component';


@NgModule({
  declarations: [ProfileWrapperComponent, ProfileNavContainerComponent, ProfileBoxesContainerComponent, ProfileBreadcrumbsComponent, ProfileBoxesComponent, ProfileBoxCreateComponent, ProfileBoxCreateContainerComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ]
})
export class ProfileModule { }
