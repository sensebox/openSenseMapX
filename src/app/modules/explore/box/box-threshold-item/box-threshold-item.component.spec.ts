import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxThresholdItemComponent } from './box-threshold-item.component';

describe('BoxThresholdItemComponent', () => {
  let component: BoxThresholdItemComponent;
  let fixture: ComponentFixture<BoxThresholdItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxThresholdItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxThresholdItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
