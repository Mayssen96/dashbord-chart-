import { TestBed } from '@angular/core/testing';

import { ReservationEvenementService } from './reservation-evenement.service';

describe('ReservationEvenementService', () => {
  let service: ReservationEvenementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationEvenementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
