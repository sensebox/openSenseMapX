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
import { FormsModule } from '@angular/forms';
// import { TranslateModule } from '@ngx-translate/core';
import { FilterSwitcherComponent } from './filter/filter-switcher/filter-switcher.component';
import { FilterComponent } from './filter/filter/filter.component';
import { ExploreModule } from '../explore/explore.module';
import { ImpressumComponent } from './impressum/impressum.component';
import { PhenoInfoComponent } from './pheno-info/pheno-info.component';
import { ModalComponent } from './modal/modal.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [FilterContainerComponent, SearchComponent, SearchContainerComponent, PhenomenonComponent, NavContainerComponent, NavRightComponent, BottomBarContainerComponent, DatepickerComponent, FilterSwitcherComponent, FilterComponent, ImpressumComponent, PhenoInfoComponent, ModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    FormsModule,
    ExploreModule,
    SharedModule
  ],
  exports: [FilterContainerComponent, NavContainerComponent, BottomBarContainerComponent, PhenomenonComponent, ImpressumComponent, ModalComponent],
})
export class CoreModule { }
