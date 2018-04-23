import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from './customer.service'
import { TimeService } from './time.service'
import {Parser} from 'xml2js';
import { Observable } from 'rxjs/Observable';
//var Parser = require('xml-streamer')


// Service för att hämta info om ordrar och skapa objekt

@Injectable()
export class OrdersService {

  customers = []
  customerList = [] //filtrera alla kunder med ordrar till array

  //sections
  solsidan = []
  dannes = []
  bong = []

  //numbersToShow
  allOrders = []  // alla ordrar
  openOrders = [] // alla öppna ordrar
  abroadOrders = []
  restOrders = []
  orderLines = []  
  
  todaysOrders = []
  

  constructor(private http: HttpClient,
              private customerService: CustomerService,
              private TimeService: TimeService) { }

           

    //Hämtar och skapar en array med alla ordrar
  
    async getOrders() {
      let parseString = require('xml2js').parseString
      let json;

      this.clearOrders() // rensar ordrar för att undvika duplicering
     this.http.get('https://raw.githubusercontent.com/1dv430/mo222yy-project/master/Orders2.xml?token=Ad3tHjMSMYgJNwK0PiMrh3-pBmYnXS4cks5a5w2EwA%3D%3D', {responseType: 'text' })
     .subscribe(data => {
       parseString(data, function(err, result) {
        if(err) {
          console.log('ERROR' + err)
          return;
        } else {
          json = result
         }
       })
       //filtrerar json till endast ordrar
       
       let orders = json.BorjesDashBoardInfo.Orders[0].BorjesDashBoardOrder
       
       //ändrar alla ordrar till dagens datum, för utv syfte.
       orders.forEach(el =>{
         let date = el.DeliveryDate[0].split("T")
         let today = "2018-04-23T"+ date[1]
         el.DeliveryDate.splice(0, 1, today)
       })
       
       this.allOrders = orders
      })
    }

    /**
     * Lägger till ordrar med dagens datum som deliveryDate
     * Läggs i todaysOrders[]
     */
    getTodaysOrders(arr) {
      let year = parseInt(this.TimeService.year)
      let month = parseInt(this.TimeService.month) + 1 //+1 för rätt månad
      let date = parseInt(this.TimeService.date)
     
      arr.forEach(el => {
        let orderDeliveryDate = el.DeliveryDate[0]
        let dateSplit = orderDeliveryDate.split('T')
        let dateString = dateSplit[0]
        
        let deliveryYear = parseInt(dateString.substring(0, 4))
        let deliveryMonth = parseInt(dateString.substring(5,7))
        let deliveryDate = parseInt(dateString.substring(8,10))

        if(deliveryYear === year && deliveryMonth+1 === month && deliveryDate === date) {
          this.todaysOrders.push(el)
        }
      })
    }



    /**
     * Kollar orderstatus på alla ordrar i arr och lägger till i 
     * openOrders[]
     * restOrders[]
     * abroadOrders[]
     * orderLines[]
     * 200 = öppen, 300 = plockning, 310 = på plockuppdrag 
     * 1000 = restad
     * @param arr 
     */
    getOrderStatus(arr) {
      arr.forEach(el => {
        if(el.OrderStatusNumber[0] === "200" || el.OrderStatusNumber[0] === "300" || el.OrderStatusNumber[0] === "310") {
          if(el.OrderPickability[0] !== "200" || el.OrderPickability[0] !== "300"){
            this.openOrders.push(el)
              if('OrderLines' in el) {
              let orderLineArray = el.OrderLines[0].BorjesDashBoardOrderLine
              orderLineArray.forEach(e => {
              if(e.DoPick[0] === "true") {
              this.orderLines.push(e)
               }
              })
             }
            if(el.CountryCode[0] !== "SE") {
              this.abroadOrders.push(el)
            }
          } 
        } else {
          this.restOrders.push(el)
        }
      })
    }

    /**
     * Fördelar ordrarna i arr till respektive kund
     * @param arr 
     */
    distributeCustomerOrders(arr) {

      this.customers = this.customerService.customers //hämta kunder

      arr.forEach(order => {
        this.customers.forEach(customer => {
          //ÖPPNA + UTLANDS
          if(order.GoodsOwnerId[0] === customer.customerID){
            customer.openOrders.push(order)
            if(order.CountryCode[0] !== "SE") {
            customer.abroadOrders.push(order)
            } 
            //RESTADE
            if(order.OrderPickability[0] === "1000") {
              customer.restOrders.push(order)
            } 
            //ORDERLINES
            if( 'OrderLines' in order ) {
             order.OrderLines[0].BorjesDashBoardOrderLine.forEach(ol => {
               if(ol.DoPick[0] === 'true') {
                 customer.orderLines.push(ol)
               }
             })
             if(customer.section === 'solsidan') {
              this.solsidan.push(order)
                
             } else if (customer.section === 'dannes') {
                this.dannes.push(order)
             } else if (customer.section === 'bong') {
                this.bong.push(order)
             } else {
               console.log(customer.customerName, 'saknar avdelning')
             }
            }
          }
        })
      })
  }


    /**
     * Filtrerar customers 
     * @param arr 
     */
    setCustomerList() {
      this.customerList = this.customers.filter(el => el.openOrders.length > 0)
      this.customerList.sort(function(a,b){
        return b.openOrders.length - a.openOrders.length
      })  
    }

    //rensar alla orderArrays i kundobjekten
    clearOrders() {
      this.todaysOrders = []
      this.allOrders = []
      this.solsidan = []
      this.dannes = []
      this.bong = []
      this.openOrders = []
      this.abroadOrders = []
      this.restOrders = []
      this.orderLines = [] 
      //rensar ordrar i kundobjekten
      this.customers.forEach(customer => {
        customer.openOrders = []
        customer.abroadOrders = []
        customer.restOrders = []
        customer.orderLines = []
      })
    }
  }
