import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxesContainerComponent } from './profile-boxes-container.component';

describe('ProfileBoxesContainerComponent', () => {
  let component: ProfileBoxesContainerComponent;
  let fixture: ComponentFixture<ProfileBoxesContainerComponent>;

  beforeEach(async(() => {
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
