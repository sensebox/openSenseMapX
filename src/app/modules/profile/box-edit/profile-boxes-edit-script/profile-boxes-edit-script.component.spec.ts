import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxesEditScriptComponent } from './profile-boxes-edit-script.component';

describe('ProfileBoxesEditScriptComponent', () => {
  let component: ProfileBoxesEditScriptComponent;
  let fixture: ComponentFixture<ProfileBoxesEditScriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxesEditScriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxesEditScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
