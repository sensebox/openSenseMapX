import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxCreateSummaryContainerComponent } from './profile-box-create-summary-container.component';

describe('ProfileBoxCreateSummaryContainerComponent', () => {
  let component: ProfileBoxCreateSummaryContainerComponent;
  let fixture: ComponentFixture<ProfileBoxCreateSummaryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxCreateSummaryContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxCreateSummaryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
