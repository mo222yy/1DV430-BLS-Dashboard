import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrdersService } from '../orders.service'
import { CustomerService } from '../customer.service'
import { TransporterService } from '../transporter.service'

@Component({
  selector: 'app-utleverans',
  templateUrl: './utleverans.component.html',
  styleUrls: ['./utleverans.component.scss']

})

export class UtleveransComponent implements OnInit {
 openOrders = []
 abroadOrders = []
 restOrders = []
 orderLines = []

 todaysOrders = []

   //Customer
   customers = []
   customerList = []

   //sections
   allOrders = []
   solsidan = []
   dannes = []
   bong = []

   sectionHeader: string = 'Alla'

   nextPickUp = []

  constructor( private ordersService: OrdersService,
               private customerService: CustomerService,
               private transporterService: TransporterService) { }
  
  ngOnInit() {
   this.getOrders()
   this.getNextPickUp()
  }

    //Hämtar ordrar och kör sedan sortOrders()
    async getOrders() {
      this.ordersService.getOrders()
      let result = await this.sortOrders()
  
    }
  //körs efter getOrders
    sortOrders() {
    return new Promise(resolve => {
      setTimeout(() => {

      //hämta dagens ordrar
      this.ordersService.getTodaysOrders(this.ordersService.allOrders)
      this.todaysOrders = this.ordersService.todaysOrders

      //hämta och filtrera alla ordrar efter status
      this.ordersService.getOrderStatus(this.todaysOrders)

      this.updateNumbers()

        resolve('resolved')
      }, 1000) // kan behöva ändras vid större mängd data ?
    }).then(v => {  

      //hämta kunder
      this.customerService.getCustomers()
      this.customers = this.ordersService.customers

      //fördela ordrar till kunder
      this.ordersService.distributeCustomerOrders(this.todaysOrders)
    }).then(a => {
      this.ordersService.setCustomerList()
      //hämta avdelningsarrays för filtrering
      this.customerList = this.ordersService.customerList
      this.solsidan = this.ordersService.solsidan
      this.dannes = this.ordersService.dannes
      this.bong = this.ordersService.bong
    })
  }

  /**
   * Uppdaterar alla listor
   */
  updateNumbers() {
    this.openOrders = this.ordersService.openOrders //ej korrekt
    this.abroadOrders = this.ordersService.abroadOrders
    this.restOrders = this.ordersService.restOrders
    this.orderLines = this.ordersService.orderLines
    this.allOrders = this.ordersService.allOrders
  }

  selectedSection(arr, section) {
   this.ordersService.clearOrders()
   this.ordersService.getOrderStatus(arr)
   this.ordersService.distributeCustomerOrders(arr)
   this.ordersService.setCustomerList()
   this.customerList = this.ordersService.customerList

   this.openOrders = this.ordersService.openOrders
   this.abroadOrders = this.ordersService.abroadOrders
   this.restOrders = this.ordersService.restOrders
   this.orderLines = this.ordersService.orderLines

   //Section Header
   if(section === 'Solsidan') {
     this.sectionHeader = 'Solsidan'
   } else if (section === 'Dannes') {
     this.sectionHeader = 'Dannes'
   } else if(section === 'Bong') {
     this.sectionHeader ='Bong'
   } else if (section === 'All') {
     this.sectionHeader = 'Alla'
   }
  }
    //TRANSPORTÖR
    getNextPickUp() {
      this.nextPickUp =  this.transporterService.getNextPickUp()
      console.log(this.nextPickUp)
    }
}
