import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxCreateSummaryComponent } from './profile-box-create-summary.component';

describe('ProfileBoxCreateSummaryComponent', () => {
  let component: ProfileBoxCreateSummaryComponent;
  let fixture: ComponentFixture<ProfileBoxCreateSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxCreateSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxCreateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
