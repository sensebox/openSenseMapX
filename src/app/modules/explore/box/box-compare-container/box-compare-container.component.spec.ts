import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BoxCompareContainerComponent } from './box-compare-container.component';

describe('BoxCompareContainerComponent', () => {
  let component: BoxCompareContainerComponent;
  let fixture: ComponentFixture<BoxCompareContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxCompareContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxCompareContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
