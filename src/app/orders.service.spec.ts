import { TestBed, inject } from '@angular/core/testing';
import { OrdersService } from './orders.service';
import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { TimeService } from './time.service';
import { toBase64String } from '@angular/compiler/src/output/source_map';


describe('OrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersService, HttpClient, HttpHandler, CustomerService, TimeService]
      
    });
  });

  it('should be created', 
  inject([OrdersService], (service: OrdersService) => {
    expect(service).toBeTruthy();
  }))

  it('getOrdersToday should not return any orders due to wrong date',
  inject([OrdersService, TimeService], (orders: OrdersService, time: TimeService) => {
    let ts = time.getDate()

    let arr = [{    
        DeliveryDate: ['2018-05-01T14:23:07']        
    }]
    let test = orders.getTodaysOrders(arr)
    console.log('arr', arr.length)
    console.log('test',test.length)
    expect(test.length).toBe(0)
  }))


  it('setCustomerList should return 0 due to no open orders', 
    inject([OrdersService], (service: OrdersService) => {
      let testObj = [
        {
          customerName: 'Flattered',
          openOrders: []
        },
        {
          customerName: 'Watt & Veke',
          openOrders: []
        }
      ]

      let test = service.setCustomerList(testObj)
      expect(test.length).toBe(0)
      }))
    

  
 
});

