import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileBoxCreateGeneralContainerComponent } from './profile-box-create-general-container.component';

describe('ProfileBoxCreateGeneralContainerComponent', () => {
  let component: ProfileBoxCreateGeneralContainerComponent;
  let fixture: ComponentFixture<ProfileBoxCreateGeneralContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxCreateGeneralContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxCreateGeneralContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
