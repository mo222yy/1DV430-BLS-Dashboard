import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrdersService } from '../orders.service'

@Component({
  selector: 'app-utleverans',
  templateUrl: './utleverans.component.html',
  styleUrls: ['./utleverans.component.scss']

})

export class UtleveransComponent implements OnInit {
 orders: number;
 abroad: number;
 rest: number;
 orderLines: number;


  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    //ASYNC ? 
    this.ordersService.filterOrders()
  
  }


  updateNumbers() {
    this.orders = this.ordersService.orderArray.length;

  }

}
