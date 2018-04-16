import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {
  customers = []
  
  editCustomer: number; // index number

  constructor() { }



  customer(customerName, customerID, section, contacts, cOsweden, cOabroad, cOcomments, openOrders, abroadOrders, restOrders, orderLines) {

    this.customers.push({
    customerName: customerName,
    customerID: customerID,
    section: section,
    contacts: contacts,
    cOsweden: cOsweden,
    cOabroad: cOabroad,
    cOcomments: cOcomments,
    openOrders: openOrders,
    abroadOrders: abroadOrders,
    restOrders: restOrders,
    orderLines: orderLines
    })
    console.log('kund skapad', this.customers[this.customers.length-1])
    //Save to localstorage
    localStorage.setItem("savedCustomers", JSON.stringify(this.customers))
  }

  setCustomers() {
    localStorage.setItem("savedCustomers", JSON.stringify(this.customers))
  }

  getCustomers() {
    let savedCustomers = localStorage.getItem("savedCustomers")
    let customers = JSON.parse(savedCustomers)
    customers.sort(function(a,b){
      if(a.customerName < b.customerName) return -1
      if(a.customerName > b.customerName) return 1
      return 0
    })
    this.customers = customers

  }
}
