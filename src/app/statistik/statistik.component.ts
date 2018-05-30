import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { OrdersService } from '../orders.service'
import { TimeService } from '../time.service'
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import * as Chart from 'chart.js'
import {DataSource} from '@angular/cdk/collections';



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

  doughnutChartLeft: any;
  doughnutChartRight: any;


  dataSource = new MatTableDataSource(this.currentSection)
  displayedColumns = ['customerName', 'ordersToday', 'ordersMonth', 'orderLinesToday', 'orderLinesMonth'];


  constructor(private ordersService: OrdersService,
              private customerService: CustomerService,
              private TimeService: TimeService
  ) { }

  async ngOnInit() {
    this.getOrders()
    this.currentSection = this.customerService.customers  
    this.dataSource = this.sortCurrent(this.currentSection)
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


  scrollToList() {
    let element = document.querySelector('#customerTable')
    element.scrollIntoView();
    }

  backToTop() {
    let element = document.querySelector('#logga')
    element.scrollIntoView();

  }

  sortCurrent(current) {
    let sorted = current.sort(function(a,b) {
      var nameA= a.customerName.toLowerCase(), nameB= b.customerName.toLowerCase();

      if (nameA < nameB) 
       return -1;
      if (nameA > nameB)
       return 1;
      return 0;
    })
    console.log('sorted',sorted)
    return sorted

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
    

    //Adds customer.completedOrderLinesMonth
    section.forEach(customer => {
      if(customer.hasOwnProperty('completedMonth')) {
        customer.completedOrderLinesMonth = 0
      customer.completedMonth.forEach(order => {
        customer.completedOrderLinesMonth += parseInt(order.NumberOfPickedOrderLines)
      })
     }
    })
 

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
          customer.completedOrderLinesToday = 0
        }
        if(customer.hasOwnProperty('completedToday')) { 
          top5orders.push(customer)
          if(!customer.hasOwnProperty('completedOrderLines')) {
            customer.completedOrderLines = 0
            //for the customerList
            customer.completedOrderLinesToday = 0
          }
          customer.completedToday.forEach(order => {
            customer.completedOrderLines += parseInt(order.NumberOfPickedOrderLines)
            customer.completedOrderLinesToday  += parseInt(order.NumberOfPickedOrderLines)
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
    this.doughnutChartLeft.destroy()
    this.doughnutChartRight.destroy()
    
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
    this.dataSource = this.sortCurrent(this.currentSection)

  }

  setTimeSpan(timeSpan) {
    this.currentTimeSpan = timeSpan
    this.currentTimeSpanToShow = timeSpan
    this.getNumbersToShow(this.currentSection)
    this.getTop5(this.currentSection)

  }

  charts() {
    
    let labels = this.top5orders.map(x => x.customerName + " " + x.completedMonth.length)
  
    let orders;
    if(this.currentTimeSpan === 'Idag') {
      orders = this.top5orders.map(x => x.completedToday.length)
    } else if (this.currentTimeSpan === 'Denna månad') {
      orders = this.top5orders.map(x => x.completedMonth.length)
    }
  
    this.doughnutChartLeft = new Chart('doughnutChartLeft', {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: '# of votes',
          data: orders,
          backgroundColor: [
            'rgba(102, 99, 191, 1)',
            'rgba(44, 43, 73, 1)',
            'rgba(55, 50, 50, 1)',
            'rgba(147, 208, 62, 1)',
            'rgba(117, 222, 223, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: 'Top 5',
          fontSize: 24,
          fontColor: 'black',
          display: true
        },
        responsive: true,
        legend: {
          display: true,
          position: 'right',
          labels: {
            usePointStyle: true,
            fontSize: 20,
            padding: 40,
            fontStyle: 'bold',
            fontColor: 'black'

          }
          
        }
      }
    })

    let orderLineLabel = this.top5orders.map(x => x.customerName + " " + x.completedOrderLines )
    let orderLines = this.top5orderLines.map(x => x.completedOrderLines)

    this.doughnutChartRight = new Chart('doughnutChartRight', {
      type: 'doughnut',
      data: {
        labels: orderLineLabel,
        datasets: [{
          label: '# of votes',
          data: orderLines,
          backgroundColor: [
            'rgba(102, 99, 191, 1)',
            'rgba(44, 43, 73, 1)',
            'rgba(55, 50, 50, 1)',
            'rgba(147, 208, 62, 1)',
            'rgba(117, 222, 223, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: 'Top 5',
          fontSize: 24,
          fontColor: 'black',
          display: true
        },
        responsive: true,
        legend: {
          display: true,
          position: 'right',
          labels: {
            usePointStyle: true,
            fontSize: 20,
            fontStyle: 'bold',
            padding: 40,
            fontColor: 'black'
          }
          
        }
      }
    })
  }


  ngAfterViewInit() {
    
    }
  

  }