import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterValuesComponent } from './filter-values.component';

describe('FilterValuesComponent', () => {
  let component: FilterValuesComponent;
  let fixture: ComponentFixture<FilterValuesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
