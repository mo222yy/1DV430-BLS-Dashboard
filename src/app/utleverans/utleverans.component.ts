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
 orderLines: number;

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

  //körs efter getOrders
  updateNumbers() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.openOrders = this.ordersService.orders
        this.abroadOrders = this.ordersService.abroadOrders
        this.restOrders = this.ordersService.restOrders
        this.orderLines = this.ordersService.orderLines
        this.orderArray = this.ordersService.orders
        resolve('resolved')
      }, 1000) // kan behöva ändras vid större mängd data ?
    }).then(v => {  
      this.customerService.getCustomers()
      this.customerService.getOrders(this.orderArray)
      this.customers = this.customerService.customers
    }).then(a => {
      this.customersWithOrders = this.customerService.customersWithOrders
      //Bug nedan
      this.solsidan = this.customerService.solsidan
      this.dannes = this.customerService.dannes
      this.bong = this.customerService.bong
    })
  }
  //Hämtar ordrar och kör sedan updatenumbers()
  async getOrders() {
    this.ordersService.filterOrders()
    let result = await this.updateNumbers()

  }


  selectedSection(arr) {
   this.customerService.clearOrders()
   this.customerService.getOrders(arr)
   this.customersWithOrders = this.customerService.customersWithOrders
  }

}
