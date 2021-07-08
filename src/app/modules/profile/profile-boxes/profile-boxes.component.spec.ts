import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileBoxesComponent } from './profile-boxes.component';

describe('ProfileBoxesComponent', () => {
  let component: ProfileBoxesComponent;
  let fixture: ComponentFixture<ProfileBoxesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
