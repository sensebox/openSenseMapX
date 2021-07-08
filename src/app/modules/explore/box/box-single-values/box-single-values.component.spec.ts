import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BoxSingleValuesComponent } from './box-single-values.component';

describe('BoxSingleValuesComponent', () => {
  let component: BoxSingleValuesComponent;
  let fixture: ComponentFixture<BoxSingleValuesComponent>;

  beforeEach(waitForAsync(() => {
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
