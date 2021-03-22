import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDatepickerModalComponent } from './chart-datepicker-modal.component';

describe('ChartDatepickerModalComponent', () => {
  let component: ChartDatepickerModalComponent;
  let fixture: ComponentFixture<ChartDatepickerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDatepickerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDatepickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
