import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimeSliderComponent } from './time-slider.component';

describe('TimeSliderComponent', () => {
  let component: TimeSliderComponent;
  let fixture: ComponentFixture<TimeSliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
