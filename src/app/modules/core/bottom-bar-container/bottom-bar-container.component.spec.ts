import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BottomBarContainerComponent } from './bottom-bar-container.component';

describe('BottomBarContainerComponent', () => {
  let component: BottomBarContainerComponent;
  let fixture: ComponentFixture<BottomBarContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomBarContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomBarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
