import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOptionsContainerComponent } from './map-options-container.component';

describe('MapOptionsContainerComponent', () => {
  let component: MapOptionsContainerComponent;
  let fixture: ComponentFixture<MapOptionsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOptionsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOptionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
