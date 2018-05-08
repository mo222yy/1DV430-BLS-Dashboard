import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service'
import { CustomerService } from '../customer.service';
import { TimeService } from '../time.service'

@Component({
  selector: 'app-retur',
  templateUrl: './retur.component.html',
  styleUrls: ['./retur.component.scss'],
  providers: [OrdersService ]

})
export class ReturComponent implements OnInit {
  currentSection: string;
  customers = []
  customersWithReturns = []
  
  solsidan = []
  dannes = []
  bong = []
  alla = []

  allOrders = []
  returns = []

  today: number;
  week: number;

  constructor(private ordersService: OrdersService,
              private customerService: CustomerService,
              private TimeService: TimeService) { }

  ngOnInit() {
    this.getOrders()
   
  }

  async getOrders() {
    this.ordersService.getOrders()
    this.customerService.getCustomers()
    await this.setArrays()
    await this.distributeOrders()
    await this.getReturnsFromCustomers()
    await this.getTodaysOrders()

  }

  /**
   * hämtar ordrar och kunder från services
   * Sätter sen this.arrays
   */
  setArrays() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.allOrders = this.ordersService.allOrders
        this.customers = this.customerService.customers
        resolve('resolved')
      }, 500) // kan behöva ändras vid större mängd data ?
    })
  }

  /**
   * Fördelar ordrar till kunder för att komma åt kunder med returer
   */
  distributeOrders() {
    this.ordersService.distributeCustomerOrders(this.allOrders)
  }

  /**
   * Går igenom alla ordrar för att hitta kunder med ordrar
   * Kund pushas till this.customers
   * Order pushas till this.returns
   */
  getReturnsFromCustomers() {
    this.customers.forEach(customer => {
      if(customer.returns.length > 0){
        this.customersWithReturns.push(customer)
        customer.returns.forEach(ret => {
          this.returns.push(ret)
        })
      }
    })

  }

  getTodaysOrders() {
    this.today = this.returns.length
   
  }
}
