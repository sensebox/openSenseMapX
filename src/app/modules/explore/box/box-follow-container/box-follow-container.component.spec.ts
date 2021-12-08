import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BoxFollowContainerComponent } from './box-follow-container.component';

describe('BoxFollowContainerComponent', () => {
  let component: BoxFollowContainerComponent;
  let fixture: ComponentFixture<BoxFollowContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxFollowContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxFollowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
