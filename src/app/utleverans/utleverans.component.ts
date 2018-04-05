import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrdersService } from '../orders.service'
import { CustomerService } from '../customer.service'

@Component({
  selector: 'app-utleverans',
  templateUrl: './utleverans.component.html',
  styleUrls: ['./utleverans.component.scss']

})

export class UtleveransComponent implements OnInit {
 orderArray: Object[] = []
 openOrders: Object[] = [];
 abroadOrders: Object[] = []
 restOrders: Object[] = [];
 orderLines: number;


  constructor(private ordersService: OrdersService,
              private customerService: CustomerService) { }
  
  ngOnInit() {
    this.getOrders()
    this.customerService.CreateCustomers()
  }

  //körs efter getOrders
  updateNumbers() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.openOrders = this.ordersService.openOrders
        this.abroadOrders = this.ordersService.abroadOrders
        this.restOrders = this.ordersService.restOrders
        this.orderLines = this.ordersService.orderLines
        this.orderArray = this.ordersService.orderArray

        resolve('resolved')
      }, 1000) // kan behöva ändras vid större mängd data ?
    })
  }
  //Hämtar ordrar och kör sedan updatenumbers()
  async getOrders() {
    this.ordersService.filterOrders()
    let result = await this.updateNumbers()
  }



 
}
