import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterContainerValuesComponent } from './filter-container-values.component';

describe('FilterContainerValuesComponent', () => {
  let component: FilterContainerValuesComponent;
  let fixture: ComponentFixture<FilterContainerValuesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterContainerValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterContainerValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
