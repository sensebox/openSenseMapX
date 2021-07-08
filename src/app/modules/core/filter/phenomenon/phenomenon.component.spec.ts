import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhenomenonComponent } from './phenomenon.component';

describe('PhenomenonComponent', () => {
  let component: PhenomenonComponent;
  let fixture: ComponentFixture<PhenomenonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenomenonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenomenonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
