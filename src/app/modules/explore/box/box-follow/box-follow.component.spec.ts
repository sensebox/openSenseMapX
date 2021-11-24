import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BoxFollowComponent } from './box-follow.component';

describe('BoxFollowComponent', () => {
  let component: BoxFollowComponent;
  let fixture: ComponentFixture<BoxFollowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
