import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { OrdersService } from '../orders.service'
import { CustomerService } from '../customer.service'
import { TransporterService } from '../transporter.service'
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-utleverans',
  templateUrl: './utleverans.component.html',
  styleUrls: ['./utleverans.component.scss'],
  providers: [OrdersService, HttpClientModule, HttpClient ]

})

export class UtleveransComponent implements OnInit {
 openOrders = []
 abroadOrders = []
 restOrders = []
 orderLines = []

 todaysOrders = []

   //Customer
   customers = []
   customerList = [] // array som ska visas

   //sections
   currentSection: string = 'Alla';
   allOrders = []
   solsidan = []
   dannes = []
   bong = []

   nextPickUp = []

   dataSource = this.customerList
   displayedColumns = ['customerName', 'openOrders', 'abroadOrders', 'restOrders', 'orderLines'];

   
   
   @ViewChild(MatSort) sort: MatSort;
   
  constructor( private ordersService: OrdersService,
               private customerService: CustomerService,
               private transporterService: TransporterService) { }
               
  ngOnInit() {
    this.getOrders()
    this.getNextPickUp()  
  }
 
    //Hämtar ordrar och kör sedan sortOrders()
    async getOrders() {
     try {
      await this.ordersService.getOrders()
      await this.getTodaysOrders()
      await this.filterOrders()
      await this.updateNumbers()
      this.getCustomers()
      await this.distributeCustomerOrders()
      await this.setCustomers()
      await this.setCustomerList()
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


    getCustomers() {
      this.customerService.getCustomers()
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
      this.customers = this.ordersService.customers
      this.ordersService.setCustomerList()
      } catch (error) {
        console.log(error)
      }
    }

    setCustomerList() {
      try {
      this.customerList = this.ordersService.customerList
      } catch (error) { 
        console.log(error)
      }
    }
   
  
  /**
   * Uppdaterar alla listor
   */
  updateNumbers() {
    this.openOrders = this.ordersService.openOrders 
    this.abroadOrders = this.ordersService.abroadOrders
    this.restOrders = this.ordersService.restOrders
    this.orderLines = this.ordersService.orderLines
    this.allOrders = this.ordersService.allOrders
  }

  selectedSection(arr) {
   this.ordersService.clearOrders()
   this.ordersService.getOrderStatus(arr)
   this.ordersService.distributeCustomerOrders(arr)
   this.ordersService.setCustomerList()
   this.customerList = this.ordersService.customerList

   this.openOrders = this.ordersService.openOrders
   this.abroadOrders = this.ordersService.abroadOrders
   this.restOrders = this.ordersService.restOrders
   this.orderLines = this.ordersService.orderLines
}

/**
 * 
 * @param section argument from html
 */
updateSectionHeader(section) {
  console.log(section)
  this.currentSection = section
  return section
}


    //TRANSPORTÖR
getNextPickUp() {
      this.nextPickUp =  this.transporterService.getNextPickUp()
    }
}

