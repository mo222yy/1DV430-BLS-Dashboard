import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { OrdersService } from '../orders.service'
import { CustomerService } from '../customer.service'
import { TransporterService } from '../transporter.service'
import {MatTableModule, MatTableDataSource, MatTable} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import { CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/collections';


@Component({
  selector: 'app-utleverans',
  templateUrl: './utleverans.component.html',
  styleUrls: ['./utleverans.component.scss'],
  providers: [OrdersService, HttpClientModule, HttpClient ]

})

export class UtleveransComponent implements OnInit {
 openOrders: number;
 abroadOrders: number;
 restOrders: number;
 orderLines: number;

 todaysOrders = []

   //Customer
   customers = []
   customerList = [] // array som ska visas

   //sections
   currentSection: string = 'Alla';
   allCustomers = []
   solsidan = []
   dannes = []
   bong = []

   nextPickUp = []

   dataSource = new MatTableDataSource(this.customerList)
   displayedColumns = ['customerName', 'openOrders', 'abroadOrders', 'restOrders', 'orderLines'];

   
   
   @ViewChild(MatSort) sort: MatSort;
   
  constructor( private ordersService: OrdersService,
               private customerService: CustomerService,
               private transporterService: TransporterService) { }
               
  ngOnInit() {
    this.getOrders()
    this.getNextPickUp()  

    this.dataSource.sort = this.sort;
  }

 
    //Hämtar ordrar och kör sedan sortOrders()
    async getOrders() {
     try {
      await this.ordersService.getOrders()
      await this.getTodaysOrders()
      await this.filterOrders()
      this.customerService.getCustomers()
      await this.distributeCustomerOrders()
      await this.setCustomers()
      await this.selectedSection(this.customers)
     } catch(e) {
       console.log(e)
     }
    }

    getTodaysOrders() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.todaysOrders = this.ordersService.getTodaysOrders(this.ordersService.allOrders)
          resolve('resolved')
        }, 500) // kan behöva ändras vid större mängd data ?
      }).catch(e => {
        console.log(e)
      })
    }

    filterOrders() {
      try {
      this.ordersService.getOrderStatus(this.todaysOrders)
      } catch(error) {
        console.log(error)
      }
    }

    distributeCustomerOrders() {
      try {
      this.ordersService.distributeCustomerOrders(this.todaysOrders)
      } catch(error) {
        console.log(error)
      }
    }
    
    setCustomers() {
      try {
      this.customers = this.customerService.customers
      this.solsidan = this.customerService.solsidan
      this.dannes = this.customerService.dannes
      this.bong = this.customerService.bong
      this.allCustomers = this.customerService.customers

      } catch (error) {
        console.log(error)
      }
    }

   
   
  
  /**
   * Uppdaterar alla listor
   */
  clearNumbers() {
    this.openOrders = 0
    this.abroadOrders = 0
    this.restOrders = 0
    this.orderLines = 0
  }

  async selectedSection(section) {
    this.clearNumbers()

    if (section === 'solsidan') {
      this.customerList = this.solsidan
    } else if (section === 'dannes') {
      this.customerList = this.dannes
    } else if (section === 'bong') {
      this.customerList = this.bong
    } else if ( section = 'all') {
      this.customerList = this.allCustomers
    }

    this.customerList.forEach(customer => {
      this.openOrders += customer.openOrders.length
      this.abroadOrders += customer.abroadOrders.length 
      this.restOrders += customer.restOrders.length 
      this.orderLines += customer.orderLines.length
    })

    console.log('cl', this.customerList)
    let cl = this.customerList.filter(order => order.openOrders.length > 0)
    

    cl.sort(function(a,b){
      return b.openOrders.length - a.openOrders.length
    })

    this.customerList = cl
}

/**
 * 
 * @param section argument from html
 */
updateSectionHeader(section) {
  this.currentSection = section
  return section
}


    //TRANSPORTÖR
getNextPickUp() {
      this.nextPickUp =  this.transporterService.getNextPickUp()
    }
}

