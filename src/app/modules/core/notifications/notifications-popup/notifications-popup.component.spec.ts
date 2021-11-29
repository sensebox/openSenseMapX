import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationsPopupComponent } from './notifications-popup.component';

describe('NotificationsViewerComponent', () => {
  let component: NotificationsPopupComponent;
  let fixture: ComponentFixture<NotificationsPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
