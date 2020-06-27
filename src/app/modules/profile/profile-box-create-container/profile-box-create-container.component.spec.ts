import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxCreateContainerComponent } from './profile-box-create-container.component';

describe('ProfileBoxCreateContainerComponent', () => {
  let component: ProfileBoxCreateContainerComponent;
  let fixture: ComponentFixture<ProfileBoxCreateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxCreateContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
