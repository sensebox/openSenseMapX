import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDatepickerModalContainerComponent } from './chart-datepicker-modal-container.component';

describe('ChartDatepickerModalContainerComponent', () => {
  let component: ChartDatepickerModalContainerComponent;
  let fixture: ComponentFixture<ChartDatepickerModalContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDatepickerModalContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDatepickerModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
