import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxesEditSecurityComponent } from './profile-boxes-edit-security.component';

describe('ProfileBoxesEditSecurityComponent', () => {
  let component: ProfileBoxesEditSecurityComponent;
  let fixture: ComponentFixture<ProfileBoxesEditSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxesEditSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxesEditSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
