import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoxCreateComponent } from './profile-box-create.component';

describe('ProfileBoxCreateComponent', () => {
  let component: ProfileBoxCreateComponent;
  let fixture: ComponentFixture<ProfileBoxCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBoxCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoxCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
