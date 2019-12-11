import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsemLineChartComponent } from './osem-line-chart.component';

describe('OsemLineChartComponent', () => {
  let component: OsemLineChartComponent;
  let fixture: ComponentFixture<OsemLineChartComponent>;

  beforeEach(async(() => {
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
