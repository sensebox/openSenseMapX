import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LegendEditComponent } from './legend-edit.component';

describe('LegendEditComponent', () => {
  let component: LegendEditComponent;
  let fixture: ComponentFixture<LegendEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
