import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxCompareContainerComponent } from './box-compare-container.component';

describe('BoxCompareContainerComponent', () => {
  let component: BoxCompareContainerComponent;
  let fixture: ComponentFixture<BoxCompareContainerComponent>;

  beforeEach(async(() => {
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
