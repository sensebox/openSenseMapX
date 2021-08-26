import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxesEditContainerComponent } from './profile-boxes-edit-container.component';

describe('ProfileBoxesEditContainerComponent', () => {
  let component: ProfileBoxesEditContainerComponent;
  let fixture: ComponentFixture<ProfileBoxesEditContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxesEditContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxesEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
