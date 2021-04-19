import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVisComponent } from './profile-vis.component';

describe('ProfileVisComponent', () => {
  let component: ProfileVisComponent;
  let fixture: ComponentFixture<ProfileVisComponent>;

  beforeEach(async(() => {
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
