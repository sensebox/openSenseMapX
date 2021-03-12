import { TestBed } from '@angular/core/testing';

import { Map2Service } from './map2.service';

describe('Map2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Map2Service = TestBed.get(Map2Service);
    expect(service).toBeTruthy();
  });
});
