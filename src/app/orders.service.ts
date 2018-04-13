import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from './customer.service'

// Service för att hämta info om ordrar och skapa objekt

@Injectable()
export class OrdersService {
  orders = []  // alla ordrar
  customerWithOrders = [] //filtrera alla kunder med ordrar till array

  //sections
  solsidan = []
  dannes = []
  bong = []

  //numbersToShow
  openOrders = [] // alla öppna ordrar
  abroadOrders: Object[] = []
  restOrders: Object[] = []
  orderLines: number;  
  

  constructor(private http: HttpClient,
              private customerService: CustomerService) { }

    filterOrders() {
     this.http.get('https://raw.githubusercontent.com/1dv430/mo222yy-project/master/Orders2.xml?token=Ad3tHv2sFTi__XUr9sj3G0ajU-eZQa2oks5a2YQ5wA%3D%3D', {responseType: 'text' })
     .subscribe(data => {

    let json; // konvertera xml till json
    let parseString = require('xml2js').parseString
    parseString(data, function(err, result) {
       if(err) {
         console.log('ERROR' + err)
         return;
       } else {
        JSON.stringify(result)
       }
       json = result
      })
      //filtrerar json till endast ordrar
      let orders = json.BorjesDashBoardInfo.Orders[0].BorjesDashBoardOrder
      this.orders = orders

      //ÖPPNA + RESTADE 
      orders.forEach(el => {
        // 200 = öppen, 300 = plockning, 310 = på plockuppdrag 
        if(el.OrderStatusNumber[0] === "200" || el.OrderStatusNumber[0] === "300" || el.OrderStatusNumber[0] === "310") {
          this.orders.push(el)
        } 

        if(el.OrderPickability[0] !== "200" || el.OrderPickability[0] !== "300"){
          this.openOrders.push(el)
        }
        
        //RESTADE, KOLLA UPP OM PICKABILITY ÄR RÄTT
        if(el.OrderPickability[0] === "1000") {
          this.restOrders.push(el)
        }      
      })

      //UTLANDSORDRAR 
      this.orders.forEach(el => {
       if(el.CountryCode[0] !== "SE") {
         this.abroadOrders.push(el)
       }
      })

      //ORDERRADER
      let orderLines = 0
      orders.forEach(el => {
        if('OrderLines' in el) {
          let orderLineArray = el.OrderLines[0].BorjesDashBoardOrderLine

          orderLineArray.forEach(element => {
            if(element.DoPick[0] === "true") {
              orderLines++
            }
          })
        }
      })
      this.orderLines = orderLines
     })
    }

 
  
  }




