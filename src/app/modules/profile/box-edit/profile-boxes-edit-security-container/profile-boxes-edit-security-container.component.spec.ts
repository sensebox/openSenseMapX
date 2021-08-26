import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxesEditSecurityContainerComponent } from './profile-boxes-edit-security-container.component';

describe('ProfileBoxesEditSecurityContainerComponent', () => {
  let component: ProfileBoxesEditSecurityContainerComponent;
  let fixture: ComponentFixture<ProfileBoxesEditSecurityContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxesEditSecurityContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxesEditSecurityContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
