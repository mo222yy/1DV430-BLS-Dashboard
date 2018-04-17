import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrdersService } from '../orders.service'
import { CustomerService } from '../customer.service'
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-utleverans',
  templateUrl: './utleverans.component.html',
  styleUrls: ['./utleverans.component.scss']

})

export class UtleveransComponent implements OnInit {
 openOrders = []
 abroadOrders = []
 restOrders = []
 orderLines = []

 todaysOrders = []

   //Customer
   customers = []
   customerList = []

   //sections
   allOrders = []
   solsidan = []
   dannes = []
   bong = []

  constructor( private ordersService: OrdersService,
              private customerService: CustomerService) { }
  
  ngOnInit() {
   this.getOrders()
  
  }

    //Hämtar ordrar och kör sedan sortOrders()
    async getOrders() {
      this.ordersService.getOrders()
      let result = await this.sortOrders()
  
    }
  //körs efter getOrders
    sortOrders() {
    return new Promise(resolve => {
      setTimeout(() => {

      //hämta dagens ordrar
      this.ordersService.getTodaysOrders(this.ordersService.allOrders)
      this.todaysOrders = this.ordersService.todaysOrders

      //hämta och filtrera alla ordrar efter status
      this.ordersService.getOrderStatus(this.todaysOrders)

      this.updateNumbers()

        resolve('resolved')
      }, 1000) // kan behöva ändras vid större mängd data ?
    }).then(v => {  

      //hämta kunder
      this.customerService.getCustomers()
      this.customers = this.ordersService.customers

      //fördela ordrar till kunder
      this.ordersService.distributeCustomerOrders(this.todaysOrders)
    }).then(a => {
      this.ordersService.sortByOpenOrders(this.todaysOrders)
      //hämta avdelningsarrays för filtrering
      this.customerList = this.ordersService.customerList
      this.solsidan = this.ordersService.solsidan
      this.dannes = this.ordersService.dannes
      this.bong = this.ordersService.bong
    })
  }

  /**
   * Uppdaterar alla listor
   */
  updateNumbers() {
    this.openOrders = this.ordersService.openOrders //ej korrekt
    this.abroadOrders = this.ordersService.abroadOrders
    this.restOrders = this.ordersService.restOrders
    this.orderLines = this.ordersService.orderLines
    this.allOrders = this.ordersService.allOrders

  }

  selectedSection(arr) {
   this.ordersService.clearOrders()
   this.ordersService.getOrderStatus(arr)
   this.ordersService.distributeCustomerOrders(arr)
   this.customerList = this.ordersService.customerList

   this.openOrders = this.ordersService.openOrders
   this.abroadOrders = this.ordersService.abroadOrders
   this.restOrders = this.ordersService.restOrders
   this.orderLines = this.ordersService.orderLines
  }

}
