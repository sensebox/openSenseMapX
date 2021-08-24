import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxCreateAdvancedContainerComponent } from './profile-box-create-advanced-container.component';

describe('ProfileBoxCreateAdvancedContainerComponent', () => {
  let component: ProfileBoxCreateAdvancedContainerComponent;
  let fixture: ComponentFixture<ProfileBoxCreateAdvancedContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxCreateAdvancedContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxCreateAdvancedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
