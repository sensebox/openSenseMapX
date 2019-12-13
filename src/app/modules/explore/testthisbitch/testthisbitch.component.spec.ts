import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestthisbitchComponent } from './testthisbitch.component';

describe('TestthisbitchComponent', () => {
  let component: TestthisbitchComponent;
  let fixture: ComponentFixture<TestthisbitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestthisbitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestthisbitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
