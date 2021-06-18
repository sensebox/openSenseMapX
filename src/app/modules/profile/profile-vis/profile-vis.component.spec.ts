import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileVisComponent } from './profile-vis.component';

describe('ProfileVisComponent', () => {
  let component: ProfileVisComponent;
  let fixture: ComponentFixture<ProfileVisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileVisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
