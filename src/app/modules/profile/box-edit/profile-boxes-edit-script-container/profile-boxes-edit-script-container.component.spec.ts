import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxesEditScriptContainerComponent } from './profile-boxes-edit-script-container.component';

describe('ProfileBoxesEditScriptContainerComponent', () => {
  let component: ProfileBoxesEditScriptContainerComponent;
  let fixture: ComponentFixture<ProfileBoxesEditScriptContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxesEditScriptContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxesEditScriptContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
