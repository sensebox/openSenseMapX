import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BoxChartComponent } from './box-chart.component';

describe('BoxChartComponent', () => {
  let component: BoxChartComponent;
  let fixture: ComponentFixture<BoxChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
