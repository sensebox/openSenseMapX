import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFollowedBoxesComponent } from './profile-followed-boxes.component';

describe('ProfileFollowedBoxesComponent', () => {
  let component: ProfileFollowedBoxesComponent;
  let fixture: ComponentFixture<ProfileFollowedBoxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFollowedBoxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFollowedBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
