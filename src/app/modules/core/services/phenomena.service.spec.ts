import { TestBed } from '@angular/core/testing';

import { PhenomenaService } from './phenomena.service';

describe('PhenomenaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhenomenaService = TestBed.get(PhenomenaService);
    expect(service).toBeTruthy();
  });
});
