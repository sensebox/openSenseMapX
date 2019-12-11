import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxSingleValuesComponent } from './box-single-values.component';

describe('BoxSingleValuesComponent', () => {
  let component: BoxSingleValuesComponent;
  let fixture: ComponentFixture<BoxSingleValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxSingleValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxSingleValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
