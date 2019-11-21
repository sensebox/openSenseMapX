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




@NgModule({
  declarations: [FilterContainerComponent, SearchComponent, SearchContainerComponent, PhenomenonComponent, NavContainerComponent, NavRightComponent, BottomBarContainerComponent, DatepickerComponent],
  imports: [
    CommonModule,
    RouterModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    FormsModule
  ],
  exports: [FilterContainerComponent, NavContainerComponent, BottomBarContainerComponent],
})
export class CoreModule { }
