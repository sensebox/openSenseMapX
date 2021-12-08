import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFollowedBoxesContainerComponent } from './profile-followed-boxes-container.component';

describe('ProfileFollowedBoxesContainerComponent', () => {
  let component: ProfileFollowedBoxesContainerComponent;
  let fixture: ComponentFixture<ProfileFollowedBoxesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFollowedBoxesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFollowedBoxesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
