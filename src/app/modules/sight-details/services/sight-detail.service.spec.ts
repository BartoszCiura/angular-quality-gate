import { TestBed } from '@angular/core/testing';

import { SightDetailService } from './sight-detail.service';

describe('SightDetailService', () => {
  let service: SightDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SightDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
