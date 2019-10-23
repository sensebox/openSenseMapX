import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { ExploreModule } from './modules/explore/explore.module';
import { MapContainerComponent } from './components/containers/map-container/map-container.component';
import { MapComponent } from './components/map/map.component';
import { MapService } from './services/map/map.service';
import { LayerService } from './services/layer/layer.service';
import { SearchComponent } from './components/controls/search/search.component';
import { DateComponent } from './components/controls/date/date.component';
import { NavComponent } from './components/containers/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    MapContainerComponent,
    MapComponent,
    SearchComponent,
    DateComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule.forRoot(),
    CoreModule,
    SharedModule,
    ExploreModule
  ],
  providers: [MapService, LayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
