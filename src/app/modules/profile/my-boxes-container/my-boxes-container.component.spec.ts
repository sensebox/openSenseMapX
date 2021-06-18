import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyBoxesContainerComponent } from './my-boxes-container.component';

describe('MyBoxesContainerComponent', () => {
  let component: MyBoxesContainerComponent;
  let fixture: ComponentFixture<MyBoxesContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBoxesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBoxesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
