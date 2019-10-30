import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenomenonContainerComponent } from './phenomenon-container.component';

describe('PhenomenonContainerComponent', () => {
  let component: PhenomenonContainerComponent;
  let fixture: ComponentFixture<PhenomenonContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenomenonContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenomenonContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
