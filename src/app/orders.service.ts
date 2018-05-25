import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from './customer.service'
import { TimeService } from './time.service'
import { Parser } from 'xml2js';
import { Observable } from 'rxjs/Observable';


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

  returns = []
  
  todaysOrders = []
  monthOrders = []

  completedOrders = [] 

  constructor(private http: HttpClient,
              private customerService: CustomerService,
              private TimeService: TimeService
               ) { }

           

    //Hämtar och skapar en array med alla ordrar
  
    async getOrders() {
      this.clearOrders() // rensar ordrar för att undvika duplicering
      let parseString = require('xml2js').parseString
      const url = 'https://raw.githubusercontent.com/1dv430/mo222yy-project/master/Orders2.xml?token=Ad3tHhkFjfP7VtzyYB6bYEkcvqriACLtks5bCmAkwA%3D%3D'
      const url2 = 'https://00e9e64bac3beb78fc214b69b672a9577d546ecd9674642f86-apidata.googleusercontent.com/download/storage/v1/b/orders-xml/o/Orders_20180509_143020.xml?qk=AD5uMEs4FhcR9xshoxeLhv1oVgsyJUzRNql8btHHUhfoG5ABGy0JjsH9of0ZC5m5mhW6C6MNyVbYhCYO7yn6-72vl5vNUc31s5tDzE_B3fnawmx3j0jS4VZYDqikzrOBrWVoufwmLTvlrg5sx-KYcdJuOqWUFtrm_1ILRpQmfhUoDqft-3qcc-5o6Qa_0kkBxmUDCDl-SFZC7zXqP1G_7AOloUUMDNccJ1yGoi-v-hb082LF0pTL0-emMS61uUt4qNRSkkN-h-7E8TxLYvKzQ9ZFMktchTkPkYP0iLeygfswzhTwQE1ZDtjPkE0VRsbvwu8fNfvbA8Dm-3AZbxKjTR0UnEoy5tpeWyp5MlL1IKXajhY7qFweVT6C36dt-jlpOAf3gmxxLITTTZAS_Gwg8ywQuRLjh7R_I8aA5kWqx3Ck5U2NGe7AhSE7oJAzF20iN-sG8yVnGjllTPmLiCAL4aOaLwOuEj6wSlUlottANGepDJdKpaLe5ZLonmdpn3ieSw0CVA1heoNo_8BeBC8ITKmarXbrOGlYrH8eekSOoYvwNjc7vFUJ_Ifw-PaHCcG8YlwLQlKtt77cYqzXRgxk66LinP-p2rCgY9sDX6r2GMr_JVjx8DIze66LZNxmd5vHOQQ5XZA1-vfdhTQttjLCaGaq75pEESeRznqeln-xGfM6LZ4rWShDXNf7Yl8zfdV9114GYYEsKXiMiNKEgF-lyfe-4BH1uP5vEXzYmcxGxcS6FGAcpxhqE9omhYtGbrl4UarVQG8MsFdn'
      let json;

      try {
      let getXml = this.http.get(url, {responseType: 'text' })
     .subscribe( data => {
      
       parseString(data, function(err, result) {
        if(err) {
          console.log('ERROR' + err)
          return;
        } else {
          json = result

         }
       })
     
       //filtrerar json till endast ordrar
       let orders =  json.BorjesDashBoardInfo.Orders[0].BorjesDashBoardOrder

    
   /*
      let data = localStorage.getItem('orders')
      let orders = JSON.parse(data)
    */
      //ändrar alla ordrar till dagens datum, för utv syfte.
      
       orders.forEach(el =>{
         let date = el.DeliveryDate[0].split("T")
         let today = "2018-05-25T"+ date[1]
         el.DeliveryDate.splice(0, 1, today)
       })
    
       this.allOrders = orders
       return this.allOrders
     })
    } catch (error) {
      console.log(error)
    }
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
          if(el.OrderPickability[0] !== "200" || el.OrderPickability[0] !== "100"){
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
        } else { //från första if
          this.restOrders.push(el)
        }
        //hämta skickade ordrar
        if(el.OrderStatusNumber[0] === "400" || el.OrderStatusNumber[0] === "450") {
          this.completedOrders.push(el)
        }
      })
    }

    getTodaysOrders(arr) {
      let year = parseInt(this.TimeService.year)
      let month = parseInt(this.TimeService.month) //+1 för rätt månad
      let date = parseInt(this.TimeService.date)
  
      let today = []

      arr.forEach(el => {
        let orderDeliveryDate = el.DeliveryDate[0]
        let dateSplit = orderDeliveryDate.split('T')
        let dateString = dateSplit[0]
        
        let deliveryYear = parseInt(dateString.substring(0, 4))
        let deliveryMonth = parseInt(dateString.substring(5,7))
        let deliveryDate = parseInt(dateString.substring(8,10))
      
        if(deliveryYear === year && deliveryMonth === month && deliveryDate === date) {
          today.push(el)
        }
      })
      return today
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
            //RESTADE  (pickability klar blir den fortfarande restad?)
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
             //Returer
             if(order.OrderStatusNumber[0] === "600") {
               customer.returns.push(order)
             }

             //Klara
            if(order.OrderStatusNumber[0] === "400" || order.OrderStatusNumber[0] === "450") {
              let year = parseInt(this.TimeService.year)
              let month = parseInt(this.TimeService.month) //+1 för rätt månad
              let date = parseInt(this.TimeService.date)
  
              let today = []
              let monthOrders = []
            
                let orderDeliveryDate = order.DeliveryDate[0]
                let dateSplit = orderDeliveryDate.split('T')
                let dateString = dateSplit[0]
                
                let deliveryYear = parseInt(dateString.substring(0, 4))
                let deliveryMonth = parseInt(dateString.substring(5,7))
                let deliveryDate = parseInt(dateString.substring(8,10))

                if(deliveryYear === year && deliveryMonth === month && deliveryDate === date) {
                  if(!customer.hasOwnProperty('completedToday')) {
                    customer.completedToday = []
                    } 
                    customer.completedToday.push(order)
                  }
          
        
                if(deliveryYear === year && deliveryMonth === month && deliveryDate <= date){
                  if(!customer.hasOwnProperty('completedMonth')) {
                    customer.completedMonth = []
                  }
                  customer.completedMonth.push(order)
                }
            }

             //Sections
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
     * Filtrerar customers, customerlist [] innehåller kunder som har öppna ordrar
     * @param arr 
     */
    setCustomerList(customers) {
      this.customerList = customers.filter(el => el.openOrders.length > 0)
      return this.customerList
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
      this.returns
      this.orderLines = [] 
      this.completedOrders = []
      //rensar ordrar i kundobjekten
      this.customers.forEach(customer => {
        customer.openOrders = []
        customer.abroadOrders = []
        customer.restOrders = []
        customer.orderLines = []
        customer.completedOrders = []
      })
    }
  }
