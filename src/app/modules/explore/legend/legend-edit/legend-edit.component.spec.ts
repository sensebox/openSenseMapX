import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendEditComponent } from './legend-edit.component';

describe('LegendEditComponent', () => {
  let component: LegendEditComponent;
  let fixture: ComponentFixture<LegendEditComponent>;

  beforeEach(async(() => {
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
