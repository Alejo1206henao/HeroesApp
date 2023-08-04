import { TestBed } from '@angular/core/testing';

import { HeroresService } from './herores.service';

describe('HeroresService', () => {
  let service: HeroresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
