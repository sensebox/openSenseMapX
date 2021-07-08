import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChartDatepickerComponent } from './chart-datepicker.component';

describe('ChartDatepickerComponent', () => {
  let component: ChartDatepickerComponent;
  let fixture: ComponentFixture<ChartDatepickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
