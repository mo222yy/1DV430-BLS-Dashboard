import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrdersService } from '../orders.service'

@Component({
  selector: 'app-utleverans',
  templateUrl: './utleverans.component.html',
  styleUrls: ['./utleverans.component.scss']

})

export class UtleveransComponent implements OnInit {
 orderArray: Object[] = []
 openOrders: number;
 abroad: number;
 rest: number;
 orderLines: number;


  constructor(private ordersService: OrdersService) { }
  
  ngOnInit() {
    this.getOrders()
  }


  //körs efter getOrders
  updateNumbers() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.orderArray = this.ordersService.orderArray
        this.abroad = 14
        console.log(this.orderArray)
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
