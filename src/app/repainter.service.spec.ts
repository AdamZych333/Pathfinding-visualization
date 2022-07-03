import { TestBed } from '@angular/core/testing';

import { RepainterService } from './repainter.service';

describe('RepainterService', () => {
  let service: RepainterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepainterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
