import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxesEditSensorsContainerComponent } from './profile-boxes-edit-sensors-container.component';

describe('ProfileBoxesEditSensorsContainerComponent', () => {
  let component: ProfileBoxesEditSensorsContainerComponent;
  let fixture: ComponentFixture<ProfileBoxesEditSensorsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxesEditSensorsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxesEditSensorsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
