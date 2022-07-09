import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxesEditAdvancedComponent } from './profile-boxes-edit-advanced.component';

describe('ProfileBoxesEditAdvancedComponent', () => {
  let component: ProfileBoxesEditAdvancedComponent;
  let fixture: ComponentFixture<ProfileBoxesEditAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxesEditAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxesEditAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
