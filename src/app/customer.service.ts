import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {
  customers = []
  index: number = 0;

  solsidan = []
  dannes = []
  bong = []
  
  editCustomer;

  constructor() { }



  customer(customerName, customerID, section, contacts, cOsweden, cOabroad, cOcomments, openOrders, abroadOrders, restOrders, orderLines) {

    let customer = this.customers.push({
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
    orderLines: orderLines,
    index: this.index 
    })
    this.index++
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

    //Lägg till i section arrays
    this.solsidan = []
    this.dannes = []
    this.bong = []
    customers.forEach(el => {
      if(el.section === 'solsidan') {
        this.solsidan.push(el)
      } else if (el.section === 'dannes') {
        this.dannes.push(el)
      } else if (el.section === 'bong') {
        this.bong.push(el)
      }
    })
  }
}
