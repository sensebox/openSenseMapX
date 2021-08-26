import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxesEditGeneralComponent } from './profile-boxes-edit-general.component';

describe('ProfileBoxesEditGeneralComponent', () => {
  let component: ProfileBoxesEditGeneralComponent;
  let fixture: ComponentFixture<ProfileBoxesEditGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxesEditGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxesEditGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
