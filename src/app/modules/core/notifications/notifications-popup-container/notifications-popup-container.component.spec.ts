import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationsPopupContainerComponent } from './notifications-popup-container.component';

describe('NotificationsPopupContainerComponent', () => {
  let component: NotificationsPopupContainerComponent;
  let fixture: ComponentFixture<NotificationsPopupContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsPopupContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsPopupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
