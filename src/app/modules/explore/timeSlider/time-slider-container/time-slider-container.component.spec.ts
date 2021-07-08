import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimeSliderContainerComponent } from './time-slider-container.component';

describe('TimeSliderContainerComponent', () => {
  let component: TimeSliderContainerComponent;
  let fixture: ComponentFixture<TimeSliderContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSliderContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSliderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
