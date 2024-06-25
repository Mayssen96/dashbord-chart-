import { TestBed } from '@angular/core/testing';

import { ReservationOfferService } from './reservation-offer.service';

describe('ReservationOfferService', () => {
  let service: ReservationOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
