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

  it('getDate should return a date with 8 numbers',
  inject([TimeService], (service: TimeService) => {
    let expected = service.getDate()
    expect(expected.length).toBe(8)
  }))

  it('getTime should return time with 6 numbers',
  inject([TimeService], (service: TimeService) => {
   
    let expected = service.getTime()
    expect(expected.length).toBe(6)
  }))

  it('getCurrentTime should return time with 4 numbers',
  inject([TimeService], (service: TimeService) => {
    let time = service.getTime()
    let timeSub = time.substring(0, 4)
    let result = parseInt(timeSub)

    let expected = service.getCurrentTime()
    expect(expected).toEqual(result)
  }))
  
});
