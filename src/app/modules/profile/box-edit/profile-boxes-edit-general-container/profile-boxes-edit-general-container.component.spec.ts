import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxesEditGeneralContainerComponent } from './profile-boxes-edit-general-container.component';

describe('ProfileBoxesEditGeneralContainerComponent', () => {
  let component: ProfileBoxesEditGeneralContainerComponent;
  let fixture: ComponentFixture<ProfileBoxesEditGeneralContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxesEditGeneralContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxesEditGeneralContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
