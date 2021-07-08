import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OsemLineSeriesComponent } from './osem-line-series.component';

describe('OsemLineSeriesComponent', () => {
  let component: OsemLineSeriesComponent;
  let fixture: ComponentFixture<OsemLineSeriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OsemLineSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsemLineSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
