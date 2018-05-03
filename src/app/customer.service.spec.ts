import { TestBed, inject } from '@angular/core/testing';

import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService]
    });
  });

  it('should be created', 
  inject([CustomerService], (service: CustomerService) => {
    expect(service).toBeTruthy();
  }))

  it('should create an object with 11 keys', inject([CustomerService], (service: CustomerService) => {
    let contact = [{firstname: 'marre', lastname: 'olsson', phone: '0738451063', eMail:'marreolsson@live.se'}]
    let customer = service.customer('Martin', '152', 'Solsidan', contact, '1400', '1400', 'Testar',0,0,0,0)
    console.log('cm', customer)
    expect(Object.keys(customer)).toEqual([
      'customerName',
      'customerID',
      'section',
      'contacts',
      'cOsweden',
      'cOabroad',
      'cOcomments',
      'openOrders',
      'abroadOrders',
      'restOrders',
      'orderLines'
    ])
  }))

  it('getCustomers should return array of customers', inject([CustomerService], (service: CustomerService) => {
    let arr = service.getCustomers()
    expect(arr).not.toBe(null)
    expect(typeof arr).toBe('object')  
  }))
  

});
