import { TestBed } from '@angular/core/testing';

import { MissoesServiceService } from './missoes-service.service';

describe('MissoesServiceService', () => {
  let service: MissoesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissoesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
