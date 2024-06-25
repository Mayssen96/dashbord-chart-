import { TestBed } from '@angular/core/testing';

import { CategoryOfferService } from './category-offer.service';

describe('CategoryOfferService', () => {
  let service: CategoryOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
