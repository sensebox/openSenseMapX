import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxSingleContainerComponent } from './box-single-container.component';

describe('BoxSingleContainerComponent', () => {
  let component: BoxSingleContainerComponent;
  let fixture: ComponentFixture<BoxSingleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxSingleContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxSingleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});