import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseMapContainerComponent } from './map/base-map-container/base-map-container.component';
import { BaseMapComponent } from './map/base-map/base-map.component';
import { MapService } from '../../services/map/map.service';
import { BoxContainerComponent } from './box/box-container/box-container.component';
import { BoxValuesComponent } from './box/box-values/box-values.component';
import { BoxChartComponent } from './box/box-chart/box-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LegendContainerComponent } from './legend/legend-container/legend-container.component';
import { LegendComponent } from './legend/legend/legend.component';
import { TimeSliderContainerComponent } from './timeSlider/time-slider-container/time-slider-container.component';
import { TimeSliderComponent } from './timeSlider/time-slider/time-slider.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BaseMapContainerComponent, BaseMapComponent, BoxContainerComponent, BoxValuesComponent, BoxChartComponent, LegendContainerComponent, LegendComponent, TimeSliderContainerComponent, TimeSliderComponent],
  imports: [
    CommonModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [MapService],
  exports: [BaseMapContainerComponent, LegendContainerComponent, TimeSliderContainerComponent]
})
export class ExploreModule { }
