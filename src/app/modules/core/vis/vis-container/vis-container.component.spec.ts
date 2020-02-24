import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisContainerComponent } from './vis-container.component';

describe('VisContainerComponent', () => {
  let component: VisContainerComponent;
  let fixture: ComponentFixture<VisContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
