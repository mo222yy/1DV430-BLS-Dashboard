import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { OrdersService } from '../orders.service'
import { TimeService } from '../time.service'
import {MatTableModule} from '@angular/material/table';
import * as Chart from 'chart.js'



@Component({
  selector: 'app-statistik',
  templateUrl: './statistik.component.html',
  styleUrls: ['./statistik.component.scss']
})
export class StatistikComponent implements OnInit, AfterViewInit {
  allOrders = []
  allCompletedOrders = []

  currentSection =  []
  currentTimeSpan: string = 'Idag'
  currentCustomer = {}

  currentSectionToShow:string = 'Alla'
  currentTimeSpanToShow: string = 'Idag'
  currentCustomerToShow: string = 'Välj kund'

  ordersCompletedToday  = []
  ordersCompletedMonth = []

  orderNumberToShow: number = 0;
  orderLinesToShow: number = 0;

  top5orders = []
  top5orderLines = []

  completedThisMonth = []

  doughnutChart: any;


  constructor(private ordersService: OrdersService,
              private customerService: CustomerService,
              private TimeService: TimeService
  ) { }

  async ngOnInit() {
    this.getOrders()
    this.currentSection = this.customerService.customers  
}


  async getOrders() {
    this.ordersService.getOrders()
    this.customerService.getCustomers()
    await this.distributeCompletedOrders()
    

    // för "bildspel"
    if(this.TimeService.playSection === undefined || this.TimeService.playSection === 'alla') {
      this.currentSection = this.customerService.customers //startsidan, (alla idag)
    } else if (this.TimeService.playSection === 'solsidan') {
      this.currentSection = this.customerService.solsidan
    } else if (this.TimeService.playSection === 'dannes') {
      this.currentSection = this.customerService.dannes
    } else if (this.TimeService.playSection === 'bong') {
      this.currentSection = this.customerService.bong
    }
    
    await this.getNumbersToShow(this.currentSection)
    await this.getTop5(this.currentSection)
    this.charts()
 
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
    this.top5orderLines = []
    this.top5orders = []
    let top5orders = []

    if(this.currentTimeSpan === 'Idag') {
      section.forEach(customer => {
        //nollställ för att undvika duplicering
        if(customer.hasOwnProperty('completedOrderLines')) {
          customer.completedOrderLines = 0
        }
        if(customer.hasOwnProperty('completedToday')) { 
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
        if(customer.hasOwnProperty('completedOrderLines')) {
          customer.completedOrderLines = 0
        } if(customer.hasOwnProperty('completedMonth')) {
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

    this.top5orders = top5orders.splice(0,5)
    this.top5orderLines = top5orderLines.splice(0,5)
    this.charts()
   
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
    this.getNumbersToShow(this.currentSection)
    this.getTop5(this.currentSection)

  }

  charts() {
    let labels = this.top5orders.map(x => x.customerName + " " + x.completedMonth.length)
  
    let data;
    if(this.currentTimeSpan === 'Idag') {
      data = this.top5orders.map(x => x.completedToday.length)
    } else if (this.currentTimeSpan === 'Denna månad') {
      data = this.top5orders.map(x => x.completedMonth.length)
    }
  
    this.doughnutChart = new Chart('doughnutChartLeft', {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: '# of votes',
          data: data,
          backgroundColor: [
            'rgba(233, 244, 10, 1)',
            'rgba(21, 10, 244, 1)',
            'rgba(244, 21, 10, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(117, 222, 223, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: 'Ordrar idag',
          display: false
        },
        responsive: false,
        legend: {
          display: true,
          position: 'left',
          labels: {
            usePointStyle: true,
            fontSize: 16,
            padding: 50
          }
          
        }
      }
    })
    
  }
  ngAfterViewInit() {
    
    }
  

  }
