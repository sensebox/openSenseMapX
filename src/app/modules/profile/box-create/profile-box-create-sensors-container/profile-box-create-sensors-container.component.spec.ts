import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxCreateSensorsContainerComponent } from './profile-box-create-sensors-container.component';

describe('ProfileBoxCreateSensorsContainerComponent', () => {
  let component: ProfileBoxCreateSensorsContainerComponent;
  let fixture: ComponentFixture<ProfileBoxCreateSensorsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxCreateSensorsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxCreateSensorsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
