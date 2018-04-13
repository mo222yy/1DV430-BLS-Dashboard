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
 orderArray = []
 openOrders = []
 abroadOrders = []
 restOrders = []
 orderLines = []

   //Customer
   customers = []
   customersWithOrders = []

   //sections
   solsidan = []
   dannes = []
   bong = []

  constructor( private ordersService: OrdersService,
              private customerService: CustomerService) { }
  
  ngOnInit() {
   this.getOrders()
  }

    //Hämtar ordrar och kör sedan updatenumbers()
    async getOrders() {
      this.ordersService.getOrders()
      let result = await this.updateNumbers()
  
    }
  //körs efter getOrders
  updateNumbers() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.orderArray = this.ordersService.orders // hämta orderArray
      
        this.ordersService.filterOrders(this.orderArray) //filtrera ordrar
        
        //uppdatera siffrorna
        this.openOrders = this.ordersService.orders
        this.abroadOrders = this.ordersService.abroadOrders
        this.restOrders = this.ordersService.restOrders
        this.orderLines = this.ordersService.orderLines
        this.orderArray = this.ordersService.orders
        resolve('resolved')
      }, 1000) // kan behöva ändras vid större mängd data ?
    }).then(v => {  
      this.customerService.getCustomers()
      this.ordersService.sortCustomerOrders(this.orderArray)
      this.customers = this.ordersService.customers
    }).then(a => {
      this.customersWithOrders = this.ordersService.customersWithOrders
      //Bug nedan
      this.solsidan = this.ordersService.solsidan
      this.dannes = this.ordersService.dannes
      this.bong = this.ordersService.bong
    })
  }



  selectedSection(arr) {
   this.ordersService.clearOrders()
   this.ordersService.filterOrders(arr)
   this.ordersService.sortCustomerOrders(arr)
   this.customersWithOrders = this.ordersService.customersWithOrders

   this.openOrders = this.ordersService.openOrders
   this.abroadOrders = this.ordersService.abroadOrders
   this.restOrders = this.ordersService.restOrders
   this.orderLines = this.ordersService.orderLines
   console.log(this.customers)
  }

}
