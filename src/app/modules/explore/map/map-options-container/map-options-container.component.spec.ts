import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapOptionsContainerComponent } from './map-options-container.component';

describe('MapOptionsContainerComponent', () => {
  let component: MapOptionsContainerComponent;
  let fixture: ComponentFixture<MapOptionsContainerComponent>;

  beforeEach(waitForAsync(() => {
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
