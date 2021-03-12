import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeModalContainerComponent } from './datetime-modal-container.component';

describe('DatetimeModalContainerComponent', () => {
  let component: DatetimeModalContainerComponent;
  let fixture: ComponentFixture<DatetimeModalContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimeModalContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimeModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
