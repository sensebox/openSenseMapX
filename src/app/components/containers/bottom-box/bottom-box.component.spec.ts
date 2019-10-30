import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomBoxComponent } from './bottom-box.component';

describe('BottomBoxComponent', () => {
  let component: BottomBoxComponent;
  let fixture: ComponentFixture<BottomBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
