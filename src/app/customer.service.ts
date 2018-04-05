import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {
  customers: Object[] = []

  customerOrderArray: Object[] = []
  solsidan: Object[] = []
  dannes: Object[] = []
  bong: Object[] = []

  constructor() { }
   
  Customer(goodsOwnerID, name, avdelning) {
    return {
      goodsOwnerID: goodsOwnerID,
      name: name,
      avdelning: avdelning
    }
  }

  CreateCustomers() {
    //0485
    let noll485 = this.Customer('45', '0485', 'Solsidan')
    let ARSNakaya = this.Customer('34', 'ARS-Nakaya', 'Solsidan')
    this.customers.push(
     noll485,
     ARSNakaya
    )
    console.log('customers', this.customers)

  }

}
