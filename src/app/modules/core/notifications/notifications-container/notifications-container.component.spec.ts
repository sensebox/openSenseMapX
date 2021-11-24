import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationsContainerComponent } from './notifications-container.component';

describe('NotificationsContainerComponent', () => {
  let component: NotificationsContainerComponent;
  let fixture: ComponentFixture<NotificationsContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
