import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service'
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-retur',
  templateUrl: './retur.component.html',
  styleUrls: ['./retur.component.scss'],
  providers: [OrdersService ]

})
export class ReturComponent implements OnInit {
  currentSection: string;
  customers = []
  
  solsidan = []
  dannes = []
  bong = []
  alla = []

  allOrders = []
  restOrders = []

  today: number;
  week: number;

  constructor(private ordersService: OrdersService,
              private customerService: CustomerService) { }

  ngOnInit() {
    this.getOrders()

  }

  async getOrders() {
    this.ordersService.getOrders()
    let result = await this.getReturns()
    this.customerService.getCustomers()
    this.distributeToCustomers()

  }

  /**
   * Går igenom all ordrar och
   * Pushar alla restorders till this.restOrder
   */
  getReturns() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.allOrders = this.ordersService.allOrders
        console.log(this.allOrders)
        this.allOrders.forEach(order => {
          if(order.OrderStatusNumber[0] === "600") {
            this.restOrders.push(order)
          }
        })
        this.today = this.restOrders.length //siffran som visas
        resolve('resolved')
      }, 500) // kan behöva ändras vid större mängd data ?
   })
  }  

  distributeToCustomers() {
    this.customers = this.customerService.customers
    this.customers.forEach(customer => {
      console.log(customer)
    })
  }


}
