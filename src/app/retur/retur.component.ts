import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service'

@Component({
  selector: 'app-retur',
  templateUrl: './retur.component.html',
  styleUrls: ['./retur.component.scss'],
  providers: [OrdersService ]

})
export class ReturComponent implements OnInit {
  currentSection: string;
  
  solsidan = []
  dannes = []
  bong = []
  alla = []

  allOrders = []
  restOrders = []

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.getOrders()

  }

  async getOrders() {
    this.ordersService.getOrders()
    let result = await this.getReturns()
  }

  getReturns() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.allOrders = this.ordersService.allOrders
        console.log(this.allOrders)
        this.allOrders.forEach(order => {
          if(order.OrderPickability[0] === 600) {
            console.log(order)
            this.restOrders.push(order)
          }
        })
       
        resolve('resolved')
      }, 1000) // kan behöva ändras vid större mängd data ?
      console.log('rest', this.restOrders)
  }
  }
}
