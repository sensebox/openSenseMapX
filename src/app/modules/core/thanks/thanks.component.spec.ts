import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThanksComponent } from './thanks.component';

describe('ImpressumComponent', () => {
  let component: ThanksComponent;
  let fixture: ComponentFixture<ThanksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
