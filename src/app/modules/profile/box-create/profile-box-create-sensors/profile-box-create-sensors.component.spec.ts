import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxCreateSensorsComponent } from './profile-box-create-sensors.component';

describe('ProfileBoxCreateSensorsComponent', () => {
  let component: ProfileBoxCreateSensorsComponent;
  let fixture: ComponentFixture<ProfileBoxCreateSensorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxCreateSensorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxCreateSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
