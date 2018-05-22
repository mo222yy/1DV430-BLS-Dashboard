import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TimeService } from './time.service';

import { TransporterService } from './transporter.service';

describe('TransporterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransporterService, TimeService]
    });
    
  });

  it('should be created', 
  inject([TransporterService], (service: TransporterService) => {
    expect(service).toBeTruthy();
  }))

  it('transporterObject should include name,time,logo',
  inject([TransporterService], (service: TransporterService) => {
    let name = 'Test'
    let time = '18.00'
    let logo = 'url'
    let transporter = service.Transporter(name, time, logo)
    expect(Object.keys(transporter)).toEqual([
      'name',
      'time',
      'logo'
    ])
  }))

  it('should return nextTransport as an object',
  inject([TransporterService, TimeService], (service: TransporterService, time: TimeService) => {
    let next = service.getNextPickUp()
    let expected = typeof next
    expect(expected).toBe('object')

  }))

});
