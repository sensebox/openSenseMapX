import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeModalComponent } from './datetime-modal.component';

describe('DatetimeModalComponent', () => {
  let component: DatetimeModalComponent;
  let fixture: ComponentFixture<DatetimeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
