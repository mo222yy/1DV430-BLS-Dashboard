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

  getCustomers() {
    let savedCustomers = localStorage.getItem("savedCustomers")
    this.customers = JSON.parse(savedCustomers)
  }


  

  sortArrays(arr) {
    arr = arr.filter(el => el.openOrders > 0) 
    arr.sort(function(a,b) {
      return b.openOrders - a.openOrders
    })
  }

  
  Customer(goodsOwnerID, customerName, section, cutOff, contactName, phoneNumber, eMail, openOrders, abroadOrders, restOrders, orderLines)  {
    return {
      goodsOwnerID: goodsOwnerID,
      customerName: customerName,
      section: section,
      cutOff: cutOff,
      contactName: contactName,
      phoneNumber: phoneNumber,
      eMail: eMail,
      openOrders: openOrders,
      abroadOrders: abroadOrders,
      restOrders: restOrders,
      orderLines: orderLines
    }
  }
}
