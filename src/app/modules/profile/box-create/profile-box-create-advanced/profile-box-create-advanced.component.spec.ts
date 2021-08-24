import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxCreateAdvancedComponent } from './profile-box-create-advanced.component';

describe('ProfileBoxCreateAdvancedComponent', () => {
  let component: ProfileBoxCreateAdvancedComponent;
  let fixture: ComponentFixture<ProfileBoxCreateAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxCreateAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxCreateAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
