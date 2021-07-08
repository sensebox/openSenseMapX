import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LegendEditContainerComponent } from './legend-edit-container.component';

describe('LegendEditContainerComponent', () => {
  let component: LegendEditContainerComponent;
  let fixture: ComponentFixture<LegendEditContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendEditContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
