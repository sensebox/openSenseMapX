import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterContainerValuesComponent } from './filter-container-values.component';

describe('FilterContainerValuesComponent', () => {
  let component: FilterContainerValuesComponent;
  let fixture: ComponentFixture<FilterContainerValuesComponent>;

  beforeEach(async(() => {
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
