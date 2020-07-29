import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBoxesComponent } from './my-boxes.component';

describe('MyBoxesComponent', () => {
  let component: MyBoxesComponent;
  let fixture: ComponentFixture<MyBoxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBoxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
