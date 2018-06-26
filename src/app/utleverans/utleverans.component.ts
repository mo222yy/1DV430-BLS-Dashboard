import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { TimeService } from '../time.service'

import { OrdersService } from '../orders.service'
import { CustomerService } from '../customer.service'
import { TransporterService } from '../transporter.service'
import {MatTableModule, MatTableDataSource, MatTable} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database'


@Component({
  selector: 'app-utleverans',
  templateUrl: './utleverans.component.html',
  styleUrls: ['./utleverans.component.scss'],
  providers: [OrdersService, HttpClientModule, HttpClient ]

})

export class UtleveransComponent implements OnInit {

  customers: Observable<any[]>;
  
  customerList = [];
  


   nextPickUp = []

   
   dataSource = new MatTableDataSource(this.customerList)
   displayedColumns = ['customerName', 'openOrders', 'abroadOrders', 'restOrders', 'orderLines'];
   
   @ViewChild(MatSort) sort: MatSort;
   
  constructor( 
               private TimeService: TimeService,
               private ordersService: OrdersService,
               private CustomerService: CustomerService,
               private transporterService: TransporterService,
               ) { 
               
               }
               
   ngOnInit() {
    this.getNextPickUp()  
    this.customers = this.CustomerService.customers
    this.ordersService.customerOrdersToday()
    }



    //TRANSPORTÖR
    getNextPickUp() {
      this.nextPickUp =  this.transporterService.getNextPickUp()
    }
}

