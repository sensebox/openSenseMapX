import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileBoxesContainerComponent } from './profile-boxes-container.component';

describe('ProfileBoxesContainerComponent', () => {
  let component: ProfileBoxesContainerComponent;
  let fixture: ComponentFixture<ProfileBoxesContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
