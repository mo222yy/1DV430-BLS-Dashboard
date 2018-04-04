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
 abroad: number;
 rest: number;
 orderLines: number;


  constructor(private ordersService: OrdersService) { }
  
  ngOnInit() {
    this.ordersService.filterOrders() 
    this.updateNumbers() 
  }

  updateNumbers() {
   this.orderArray =  this.ordersService.orderArray
   

  }

}
