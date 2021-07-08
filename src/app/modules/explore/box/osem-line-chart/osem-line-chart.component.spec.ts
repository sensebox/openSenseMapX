import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OsemLineChartComponent } from './osem-line-chart.component';

describe('OsemLineChartComponent', () => {
  let component: OsemLineChartComponent;
  let fixture: ComponentFixture<OsemLineChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OsemLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsemLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
