import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLoadingComponent } from './map-loading.component';

describe('MapLoadingComponent', () => {
  let component: MapLoadingComponent;
  let fixture: ComponentFixture<MapLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
