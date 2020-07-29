import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBoxesContainerComponent } from './my-boxes-container.component';

describe('MyBoxesContainerComponent', () => {
  let component: MyBoxesContainerComponent;
  let fixture: ComponentFixture<MyBoxesContainerComponent>;

  beforeEach(async(() => {
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
