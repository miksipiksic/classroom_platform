import { TestBed } from '@angular/core/testing';

import { SubjectRequestService } from './subject-request.service';

describe('SubjectRequestService', () => {
  let service: SubjectRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
