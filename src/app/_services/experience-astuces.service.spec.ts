import { TestBed } from '@angular/core/testing';

import { ExperienceAstucesService } from './experience-astuces.service';

describe('ExperienceAstucesService', () => {
  let service: ExperienceAstucesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperienceAstucesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
