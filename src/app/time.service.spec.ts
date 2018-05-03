import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TimeService } from './time.service';

describe('TimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeService]
    });
  });

  it('should be created', 
  inject([TimeService], (service: TimeService) => {
    expect(service).toBeTruthy();
  }))

  it('should return 2 digits',
  inject([TimeService], (service: TimeService) => {
  let one = 1
  expect(service.get2digits(one)).toEqual('01');
  }))

  
});
