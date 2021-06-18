import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileBreadcrumbsComponent } from './profile-breadcrumbs.component';

describe('ProfileBreadcrumbsComponent', () => {
  let component: ProfileBreadcrumbsComponent;
  let fixture: ComponentFixture<ProfileBreadcrumbsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
