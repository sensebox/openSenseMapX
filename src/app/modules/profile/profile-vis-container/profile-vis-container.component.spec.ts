import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVisContainerComponent } from './profile-vis-container.component';

describe('ProfileVisContainerComponent', () => {
  let component: ProfileVisContainerComponent;
  let fixture: ComponentFixture<ProfileVisContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileVisContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileVisContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
