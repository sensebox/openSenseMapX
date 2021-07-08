import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewVisComponent } from './new-vis.component';

describe('NewVisComponent', () => {
  let component: NewVisComponent;
  let fixture: ComponentFixture<NewVisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
