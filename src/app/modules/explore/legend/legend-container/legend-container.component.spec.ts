import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendContainerComponent } from './legend-container.component';

describe('LegendContainerComponent', () => {
  let component: LegendContainerComponent;
  let fixture: ComponentFixture<LegendContainerComponent>;

  beforeEach(async(() => {
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
