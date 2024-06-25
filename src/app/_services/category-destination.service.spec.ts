import { TestBed } from '@angular/core/testing';

import { CategoryDestinationService } from './category-destination.service';

describe('CategoryDestinationService', () => {
  let service: CategoryDestinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDestinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
