import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVisContainerComponent } from './new-vis-container.component';

describe('NewVisContainerComponent', () => {
  let component: NewVisContainerComponent;
  let fixture: ComponentFixture<NewVisContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVisContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVisContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
