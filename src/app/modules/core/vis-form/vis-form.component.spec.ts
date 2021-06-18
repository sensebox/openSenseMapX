import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisFormComponent } from './vis-form.component';

describe('VisFormComponent', () => {
  let component: VisFormComponent;
  let fixture: ComponentFixture<VisFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
