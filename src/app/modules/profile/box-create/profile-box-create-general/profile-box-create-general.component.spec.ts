import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileBoxCreateGeneralComponent } from './profile-box-create-general.component';

describe('ProfileBoxCreateGeneralComponent', () => {
  let component: ProfileBoxCreateGeneralComponent;
  let fixture: ComponentFixture<ProfileBoxCreateGeneralComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxCreateGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxCreateGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
