import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxesEditSensorsComponent } from './profile-boxes-edit-sensors.component';

describe('ProfileBoxesEditSensorsComponent', () => {
  let component: ProfileBoxesEditSensorsComponent;
  let fixture: ComponentFixture<ProfileBoxesEditSensorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxesEditSensorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxesEditSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
