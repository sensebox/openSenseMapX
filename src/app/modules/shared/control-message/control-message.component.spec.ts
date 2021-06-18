import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ControlMessageComponent } from './control-message.component';

describe('ControlMessageComponent', () => {
  let component: ControlMessageComponent;
  let fixture: ComponentFixture<ControlMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
