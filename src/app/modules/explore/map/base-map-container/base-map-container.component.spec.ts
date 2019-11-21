import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseMapContainerComponent } from './base-map-container.component';

describe('BaseMapContainerComponent', () => {
  let component: BaseMapContainerComponent;
  let fixture: ComponentFixture<BaseMapContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseMapContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseMapContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
