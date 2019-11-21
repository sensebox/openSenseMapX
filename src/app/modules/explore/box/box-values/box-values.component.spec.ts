import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxValuesComponent } from './box-values.component';

describe('BoxValuesComponent', () => {
  let component: BoxValuesComponent;
  let fixture: ComponentFixture<BoxValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
