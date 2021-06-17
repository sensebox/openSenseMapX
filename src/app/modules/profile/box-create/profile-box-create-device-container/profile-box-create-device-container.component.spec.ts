import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxCreateDeviceContainerComponent } from './profile-box-create-device-container.component';

describe('ProfileBoxCreateDeviceContainerComponent', () => {
  let component: ProfileBoxCreateDeviceContainerComponent;
  let fixture: ComponentFixture<ProfileBoxCreateDeviceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxCreateDeviceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxCreateDeviceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
