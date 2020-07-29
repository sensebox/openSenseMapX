import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxCreateGeneralContainerComponent } from './profile-box-create-general-container.component';

describe('ProfileBoxCreateGeneralContainerComponent', () => {
  let component: ProfileBoxCreateGeneralContainerComponent;
  let fixture: ComponentFixture<ProfileBoxCreateGeneralContainerComponent>;

  beforeEach(async(() => {
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
