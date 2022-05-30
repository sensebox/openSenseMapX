import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationViewerComponent } from './notification-viewer.component';

describe('NotificationViewerComponent', () => {
  let component: NotificationViewerComponent;
  let fixture: ComponentFixture<NotificationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
