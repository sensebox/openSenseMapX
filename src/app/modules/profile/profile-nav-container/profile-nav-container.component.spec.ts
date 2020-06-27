import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNavContainerComponent } from './profile-nav-container.component';

describe('ProfileNavContainerComponent', () => {
  let component: ProfileNavContainerComponent;
  let fixture: ComponentFixture<ProfileNavContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNavContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNavContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
