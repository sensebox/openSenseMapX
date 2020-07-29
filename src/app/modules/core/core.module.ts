import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './filter/search/search.component';
import { SearchContainerComponent } from './filter/search-container/search-container.component';
import { PhenomenonComponent } from './filter/phenomenon/phenomenon.component';
import { NavContainerComponent } from './nav/nav-container/nav-container.component';
import { NavRightComponent } from './nav/nav-right/nav-right.component';
import { FilterContainerComponent } from './filter/filter-container/filter-container.component';
import { BottomBarContainerComponent } from './bottom-bar-container/bottom-bar-container.component';
import { RouterModule } from '@angular/router';
import { DatepickerComponent } from './filter/datepicker/datepicker.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { TranslateModule } from '@ngx-translate/core';
import { FilterSwitcherComponent } from './filter/filter-switcher/filter-switcher.component';
import { FilterComponent } from './filter/filter/filter.component';
import { ExploreModule } from '../explore/explore.module';
import { ImpressumComponent } from './impressum/impressum.component';
import { PhenoInfoComponent } from './pheno-info/pheno-info.component';
import { ModalComponent } from './modal/modal.component';
import { SharedModule } from '../shared/shared.module';
import { VisContainerComponent } from './vis/vis-container/vis-container.component';
import { VisComponent } from './vis/vis/vis.component';
import { LoginContainerComponent } from './user/login-container/login-container.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterContainerComponent } from './user/register-container/register-container.component';
import { RegisterComponent } from './user/register/register.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { DashboardContainerComponent } from './user/dashboard-container/dashboard-container.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { MyBoxesContainerComponent } from './user/my-boxes-container/my-boxes-container.component';
import { MyBoxesComponent } from './user/my-boxes/my-boxes.component';
import { ProfileContainerComponent } from './user/profile-container/profile-container.component';


@NgModule({
  declarations: [FilterContainerComponent, SearchComponent, SearchContainerComponent, PhenomenonComponent, NavContainerComponent, NavRightComponent, BottomBarContainerComponent, DatepickerComponent, FilterSwitcherComponent, FilterComponent, ImpressumComponent, PhenoInfoComponent, ModalComponent, VisContainerComponent, VisComponent, LoginContainerComponent, LoginComponent, RegisterContainerComponent, RegisterComponent, DashboardComponent, DashboardContainerComponent, MyBoxesContainerComponent, MyBoxesComponent, ProfileContainerComponent],
  imports: [
    CommonModule,
    RouterModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
],
  exports: [FilterContainerComponent, NavContainerComponent, BottomBarContainerComponent, PhenomenonComponent, ImpressumComponent, ModalComponent],
})
export class CoreModule { }
