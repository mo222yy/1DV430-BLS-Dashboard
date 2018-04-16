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

   //Customer
   customers = []
   customersWithOrders = []

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

    //Hämtar ordrar och kör sedan updatenumbers()
    async getOrders() {
      this.ordersService.getOrders()
      let result = await this.updateNumbers()
  
    }
  //körs efter getOrders
  updateNumbers() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.allOrders = this.ordersService.allOrders // hämta orderArray
      
        this.ordersService.filterOrders(this.allOrders) //filtrera ordrar
        
        //uppdatera siffrorna
        this.openOrders = this.ordersService.allOrders
        this.abroadOrders = this.ordersService.abroadOrders
        this.restOrders = this.ordersService.restOrders
        this.orderLines = this.ordersService.orderLines
        this.allOrders = this.ordersService.allOrders
        resolve('resolved')
      }, 1000) // kan behöva ändras vid större mängd data ?
    }).then(v => {  
      this.customerService.getCustomers()
      this.ordersService.distributeCustomerOrders(this.allOrders)
      this.customers = this.ordersService.customers
    }).then(a => {
      this.customersWithOrders = this.ordersService.customersWithOrders
      this.solsidan = this.ordersService.solsidan
      this.dannes = this.ordersService.dannes
      this.bong = this.ordersService.bong
    })
  }



  selectedSection(arr) {
   this.ordersService.clearOrders()
   this.ordersService.filterOrders(arr)
   this.ordersService.distributeCustomerOrders(arr)
   this.customersWithOrders = this.ordersService.customersWithOrders

   
   this.openOrders = this.ordersService.openOrders
   this.abroadOrders = this.ordersService.abroadOrders
   this.restOrders = this.ordersService.restOrders
   this.orderLines = this.ordersService.orderLines
  }

}
