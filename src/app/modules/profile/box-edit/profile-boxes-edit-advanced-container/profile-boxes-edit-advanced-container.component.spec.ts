import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxesEditAdvancedContainerComponent } from './profile-boxes-edit-advanced-container.component';

describe('ProfileBoxesEditAdvancedContainerComponent', () => {
  let component: ProfileBoxesEditAdvancedContainerComponent;
  let fixture: ComponentFixture<ProfileBoxesEditAdvancedContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxesEditAdvancedContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxesEditAdvancedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
