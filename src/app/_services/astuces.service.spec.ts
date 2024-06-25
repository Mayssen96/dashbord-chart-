import { TestBed } from '@angular/core/testing';

import { AstucesService } from './astuces.service';

describe('AstucesService', () => {
  let service: AstucesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstucesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
