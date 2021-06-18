import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavContainerComponent } from './nav-container.component';

describe('NavContainerComponent', () => {
  let component: NavContainerComponent;
  let fixture: ComponentFixture<NavContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
