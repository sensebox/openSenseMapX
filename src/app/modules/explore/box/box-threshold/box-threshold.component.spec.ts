import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxThresholdComponent } from './box-threshold.component';

describe('BoxThresholdComponent', () => {
  let component: BoxThresholdComponent;
  let fixture: ComponentFixture<BoxThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxThresholdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
