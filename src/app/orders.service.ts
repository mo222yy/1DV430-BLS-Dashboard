import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from './customer.service'
import { TimeService } from './time.service'
import {Parser} from 'xml2js';
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
    getOrders() {
     this.clearOrders() // rensar ordrar för att undvika duplicering
     this.http.get('https://00e9e64bac95997271bce223f1a51fc0895f7873258cfa109f-apidata.googleusercontent.com/download/storage/v1/b/orders-xml/o/Orders_20180420_120036.xml?qk=AD5uMEvcw9SjViUYFgOtpDN3C3Tk0IAXuXF6f9RaVDt43fmZZi9bvHWw38MvAkZvbzAI0KSIRsPuXTRtrIJxbBPf-pExXttZEK8hEEoCX2PKGrI_MEyuw7e8pwWmqMJfdsgqA290kpMBUMJLMEVDsKmxNRLtHrAgomJ_yryNr0ONhTLIxqAKMX4PhrjIkJmbbOUfq2WQC-CNDR96Z8JNCHkDtnFvWQVnriWFA9ax4Ai21BW0kU-hA4c5wuvbnJxAbKVPpmpHBgFoaR6yC1F5TlA0g-Bopa8ZuBBUWmiOVOW_6_1pVvogXVfuNPoKS9Gv4AhcsutJC0iJeHrXEu02TKjXpD_iafrSKtt4vrRBGn0o0oYshAug5n8bjIxgciVW8DMKOviz6ceemA93KZHPy7OLzyoDO_M8R1YDHGMn9bhjfmo-fCSXT9JDUVKLFyH8VXbWfw4VoZNHyO0PGW6gCZRNB99a0ziRB0V-cJUw8_MnMStAzlk2lv0AioaQQH6sOxkcLPafBr-YnRFtobK1Y0Tfec0b87amCt6Ng024i5vablUhCgKnt5JHzdVDAA0Wm7BhzpGICAPmBeTuswntZ9hayqbvnI2XXcYsfoDcvhNb6FKcePPuhtlMuFMYDTTxVW7jLCp0OUD3pZJciGc0-lTRlAODIOIZC9sRId_FOkpbjPj8ZykThZbcIiSoZG8yUT2XToRdMwXI14kYa5BQj_IHiTETgntSWXslX8TeK4lFEnvs_JM1HpZ7JzISRcHbFKuzWmWlypOJ', {responseType: 'text' })
     .subscribe(data => {
      console.log('data', data)
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
      this.allOrders = orders
      console.log('allorders', this.allOrders)
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

        if(deliveryYear === year && deliveryMonth === month && deliveryDate === date) {
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


