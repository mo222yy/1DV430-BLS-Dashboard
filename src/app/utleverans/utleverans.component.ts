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
  @ViewChild(MatSort) sort: MatSort;
  dataSource;
  displayedColumns: string[] = ['customerName', 'customerID', 'section']

  customers: Observable<any[]>;

  allOrders = []

  nextPickUp = []

  constructor( 
               private TimeService: TimeService,
               private ordersService: OrdersService,
               private CustomerService: CustomerService,
               private transporterService: TransporterService,
               ) { 
               
               }
               
  ngOnInit() {
    this.getCustomers()
    this.getOrders()
   // this.getNextPickUp()  
  }

  getCustomers() {
      this.CustomerService.customers.subscribe(customer => {
        if(!customer) {
          return
        }
        this.dataSource = new MatTableDataSource(customer);
        this.dataSource.sort = this.sort;
      })
    }

   async getOrders() {
     this.ordersService.getOrders()
     await this.ordersService.getOrdersToday()
     await this.ordersService.distributeTodaysOrders()
     await this.ordersService.getOrderNumbers()
    }


    //TRANSPORTÖR
  getNextPickUp() {
      this.nextPickUp =  this.transporterService.getNextPickUp()
    }
}
