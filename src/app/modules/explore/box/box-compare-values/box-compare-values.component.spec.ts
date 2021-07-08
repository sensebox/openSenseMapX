import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BoxCompareValuesComponent } from './box-compare-values.component';

describe('BoxCompareValuesComponent', () => {
  let component: BoxCompareValuesComponent;
  let fixture: ComponentFixture<BoxCompareValuesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxCompareValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxCompareValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
