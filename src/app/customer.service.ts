import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {
  customers = []

  customersWithOrders = []
  
  
  solsidan = []
  dannes = []
  bong = []

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

  //rensar alla ordra i kundobjekten
  clearOrders() {
    this.solsidan = []
    this.dannes = []
    this.bong = []

    this.customers.forEach(customer => {
      customer.openOrders = []
      customer.abroadOrders = []
      customer.restOrders = []
      customer.orderLines = []
    })
  }

  getOrders(orderArray) {


    orderArray.forEach(order => {
      this.customers.forEach(customer => {
        //ÖPPNA + UTLANDS
        if(order.GoodsOwnerId[0] === customer.customerID){
          customer.openOrders.push(order)
          //customer.openOrders++
          if(order.CountryCode[0] !== "SE") {
          customer.abroadOrders.push(order)
            //  customer.abroadOrders++
          } 
          //RESTADE
          if(order.OrderPickability[0] !== "200" || order.OrderPickability[0] !== "300") {
            customer.restOrders.push(order)
            //customer.restOrders++
          } 
          //ORDERLINES
          if( 'OrderLines' in order ) {
           order.OrderLines[0].BorjesDashBoardOrderLine.forEach(ol => {
             if(ol.DoPick[0] === 'true') {
               customer.orderLines.push(ol)
              //customer.orderLines++
             }
           })
           if(customer.section === 'solsidan') {
            this.solsidan.push(order)
              
           } else if (customer.section === 'dannes') {
              this.dannes.push(order)
           } else if (customer.section === 'bong') {
              this.bong.push(order)
           }
           
          }
        }
      })
    })
   


    //FILTER LIST TO OPENORDERS AND SORT
    this.customersWithOrders = this.customers.filter(el => el.openOrders.length > 0)
    this.customersWithOrders.sort(function(a,b){
      return b.openOrders - a.openOrders
    })
 
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
