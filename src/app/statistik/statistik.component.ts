import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { OrdersService } from '../orders.service'
import { TimeService } from '../time.service'
import {MatTableModule} from '@angular/material/table';



@Component({
  selector: 'app-statistik',
  templateUrl: './statistik.component.html',
  styleUrls: ['./statistik.component.scss']
})
export class StatistikComponent implements OnInit {
  allOrders = []
  allCompletedOrders = []

  currentSection =  []
  currentTimeSpan: string = 'Idag'

  currentSectionToShow:string = 'Alla'
  currentTimeSpanToShow: string = 'Idag'

  ordersCompletedToday  = []
  ordersCompletedMonth = []

  orderNumberToShow: number = 0;
  orderLinesToShow: number = 0;

  top5orders = []
  top5orderLines = []

  completedThisMonth = []

  constructor(private ordersService: OrdersService,
              private customerService: CustomerService,
              private TimeService: TimeService
  ) { }

  ngOnInit() {
    this.getOrders()

  }


  async getOrders() {
    this.ordersService.getOrders()
    this.customerService.getCustomers()
    await this.distributeCompletedOrders()
    this.currentSection = this.customerService.customers //startsidan, (alla idag)
    await this.getNumbersToShow(this.currentSection)
    await this.getTop5(this.currentSection)

 
  }

    distributeCompletedOrders() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.ordersService.distributeCustomerOrders(this.ordersService.allOrders)
        resolve('resolved')

      }, 500) // kan behöva ändras vid större mängd data ?
    })
  }

  getNumbersToShow(section) {
    this.orderNumberToShow = 0
    this.orderLinesToShow = 0

    if(this.currentTimeSpan === 'Idag') {
      section.forEach(customer => {
        if(customer.hasOwnProperty('completedToday')){
          this.orderNumberToShow += customer.completedToday.length
          customer.completedToday.forEach(order => {
            this.orderLinesToShow += parseInt(order.NumberOfPickedOrderLines)
          })
        }
      })
    
    } else if (this.currentTimeSpan === 'Denna månad') {
      section.forEach(customer => {
        if(customer.hasOwnProperty('completedMonth')) {
          this.orderNumberToShow += customer.completedMonth.length
          customer.completedMonth.forEach(order => {
            this.orderLinesToShow += parseInt(order.NumberOfPickedOrderLines)
          })
        }
      })
    }

  }

  getTop5(section) {
    let top5orders = []

    if(this.currentTimeSpan === 'Idag') {
      section.forEach(customer => {
        //nollställ för att undvika duplicering
        if(customer.hasOwnProperty('completedOrderLines')) {
          customer.completedOrderLines = 0
        }
        if(customer.hasOwnProperty('completedToday')) {
          console.log(customer)
          top5orders.push(customer)
          if(!customer.hasOwnProperty('completedOrderLines')) {
            customer.completedOrderLines = 0
          }
          customer.completedToday.forEach(order => {
            customer.completedOrderLines += parseInt(order.NumberOfPickedOrderLines)
          })
        }
      })
      top5orders.sort(function(a,b) {
        return b.completedMonth.length - a.completedMonth.length
      })
    
    } else if ( this.currentTimeSpan === 'Denna månad') {
      section.forEach(customer => {
        if(customer.hasOwnProperty('completedMonth')) {
          top5orders.push(customer)
          if(!customer.hasOwnProperty('completedOrderLines')) {
            customer.completedOrderLines = 0
          }
          customer.completedMonth.forEach(order => {
            customer.completedOrderLines += parseInt(order.NumberOfPickedOrderLines)
          })
        }
      })
      top5orders.sort(function(a,b) {
        return b.completedMonth.length - a.completedMonth.length
      })
    }

    let top5orderLines = top5orders.slice()
    top5orderLines.sort(function(a,b) {
      return b.completedOrderLines - a.completedOrderLines
    })

    this.top5orders = top5orders
    this.top5orderLines = top5orderLines
   
  }
 
  setSection(section) {
    if (section === 'solsidan') {
      this.currentSection = this.customerService.solsidan
      this.currentSectionToShow  = 'Solsidan'
    
    } else if (section === 'dannes') {
      this.currentSection = this.customerService.dannes
      this.currentSectionToShow  = 'Dannes'

    } else if (section === 'bong') {
      this.currentSection = this.customerService.bong
      this.currentSectionToShow  = 'Bong'

    } else if (section === 'alla') {
      this.currentSection = this.customerService.customers
      this.currentSectionToShow  = 'Alla'

    } 

    this.getNumbersToShow(this.currentSection)
    this.getTop5(this.currentSection)
  }

  setTimeSpan(timeSpan) {
    this.currentTimeSpan = timeSpan
    this.currentTimeSpanToShow = timeSpan
    console.log(this.currentTimeSpan)
    console.log(this.currentSection)
    this.getNumbersToShow(this.currentSection)

  }






































  /**
   * Filtrerar till dagens ordrar via ordersservice
   * går igenom dagens ordrar och pushar orderrader till orderLinesCompletedToday
  
  getNumbersToShow(section, timeSpan) {
    this.orderLinesToShow = 0

    if (timeSpan === 'today') {
      this.ordersCompletedToday = this.ordersService.getTodaysOrders(this.allCompletedOrders)
      this.orderNumberToShow = this.ordersCompletedToday.length

      this.ordersCompletedToday.forEach(order => {
        let pickedLines = order.NumberOfPickedOrderLines[0]
        let pl = parseInt(pickedLines)
        this.orderLinesToShow += pl  
      })

    if (timeSpan === 'month') {
      section.forEach(customer => {
        console.log(customer)
      })
    }
  
    }

    else if(timeSpan === 'month') {
      this.ordersCompletedMonth = this.ordersService.getMonthOrders(this.allCompletedOrders)
      this.orderNumberToShow = this.ordersCompletedMonth.length


      this.ordersCompletedMonth.forEach(order => {
        let pickedLines = order.NumberOfPickedOrderLines[0]
        let pl = parseInt(pickedLines)
        this.orderLinesToShow += pl
        
      })
  
    } 
  
  }


   * Fördelar dagens ordrar till kunder för att hämta top5 lista
 
  distributeToCustomers(arr) {
    this.ordersService.distributeCustomerOrders(arr)
    this.customers = this.customerService.customers
  }

  
   * 
   * @param customers customer list to iterate
   * @param timeSpan decides if filter todays or months orders
  
  getTop5(customers, timeSpan) {
   // let ordersCompleted: number = 0;
    let top5orders = []
    let top5orderLines = []
    let orderLinesCompleted: number = 0;

    customers.forEach(customer => {
      if(customer.hasOwnProperty('completedOrders')){
        if (customer.completedOrders.length > 0){
          if(timeSpan === 'today') {
            customer.completedOrdersToShow = this.ordersService.getTodaysOrders(customer.completedOrders)
          } else if (timeSpan === 'month') {
            customer.completedOrdersToShow = this.ordersService.getMonthOrders(customer.completedOrders)
          }
        }
      }
     
      if (customer.hasOwnProperty('completedOrdersToShow')){
          top5orders.push(customer)  
          customer.completedOrderLinesToShow = 0

          customer.completedOrdersToShow.forEach(order => {
            let ol = parseInt(order.NumberOfPickedOrderLines)
            customer.completedOrderLinesToShow += ol
            orderLinesCompleted += ol
          })
        }             
    }) 
  
    top5orders.sort(function(a,b){
      return b.completedOrdersToShow.length - a.completedOrdersToShow.length
    }) 

    top5orderLines = top5orders.slice()
    top5orderLines.sort(function(a,b) {
      return b.completedOrderLinesToShow.length - a.completedOrderLinesToShow.length
    })
    top5orders.splice(5)
    this.top5orders = top5orders;
    
    top5orderLines.splice(5)
    this.top5orderLines = top5orderLines


  }

  getMonth() {
    console.log(this.currentSection)
  
    if(this.currentSection === 'Solsidan') {
      this.getTop5(this.customerService.solsidan, 'month')
      this.getNumbersToShow(this.customerService.solsidan, 'month')
      console.log(this.customerService.solsidan)

    } else if(this.currentSection  === 'Dannes') {
      this.getTop5(this.customerService.dannes, 'month')
      this.getNumbersToShow(this.customerService.dannes, 'month')

    } else if(this.currentSection  === 'Bong') {
      this.getTop5(this.customerService.bong, 'month')
      this.getNumbersToShow(this.customerService.bong, 'month')

    } else if(this.currentSection  === 'Alla') {
      this.getTop5(this.customerService.customers, 'month')
      this.getNumbersToShow(this.customerService.customers, 'month')
    }
  }
  
 

  selectedTimeSpan(timeSpan) {
    this.currentTimeSpan = timeSpan
  }
  
  selectedSection(section) {
    this.currentSection = section.charAt(0).toUpperCase() + section.slice(1)

    if(section === 'solsidan') {
      this.getTop5(this.customerService.solsidan, 'today')

    } else if(section === 'dannes') {
      this.getTop5(this.customerService.dannes, 'today')

    } else if(section === 'bong') {
      this.getTop5(this.customerService.bong, 'today')

    } else if(section === 'alla') {
    this.getTop5(this.customerService.customers, 'today')
    }
  }
  
*/

}