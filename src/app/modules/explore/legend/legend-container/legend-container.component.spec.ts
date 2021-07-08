import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LegendContainerComponent } from './legend-container.component';

describe('LegendContainerComponent', () => {
  let component: LegendContainerComponent;
  let fixture: ComponentFixture<LegendContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
