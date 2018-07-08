import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { CustomerService } from './customer.service'
import { TimeService } from './time.service'
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database'



// Service för att hämta info om ordrar och skapa objekt
@Injectable()
export class OrdersService {

  ordersRef: AngularFireList<any>;
  orders: Observable<any[]>

  customers: Observable<any[]>;
 
  
 
  allOrders = [];
  ordersToday = [];

  openOrders: number;


  constructor(private http: HttpClient,
              private customerService: CustomerService,
              private TimeService: TimeService,
              db: AngularFireDatabase
               ) { }

   
    async getOrders() {
      
      let parseString = require('xml2js').parseString
      const url = 'https://firebasestorage.googleapis.com/v0/b/borjesdb.appspot.com/o/Orders2.xml?alt=media&token=91410894-430e-4442-b2f6-ee258eacc978'
      const url2 = 'https://raw.githubusercontent.com/mo222yy/dashboard/master/Orders2.xml'
      let json;
  
      try {

      let getXml = await this.http.get(url2, { responseType: 'text' })
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

      //ändrar alla ordrar till dagens datum, för utv syfte.
       
       orders.forEach(el =>{
         let date = el.DeliveryDate[0].split("T")
         let today = this.TimeService.dateForOrders + "T" + date[1]
         el.DeliveryDate.splice(0, 1, today)
        })

        for(let i = 0; i < orders.length; i++) {
          let date = orders[i].DeliveryDate[0].split("T")
          let today = this.TimeService.year + "-" + this.TimeService.month + "-08T" + date[1]
          orders[i].DeliveryDate[0] = today
        }
        
        this.allOrders = orders
       return this.allOrders
     })
   
    } catch (error) {
      console.log(error)
    }
  }

    getOrdersToday() {
      let year = parseInt(this.TimeService.year)
      let month = parseInt(this.TimeService.month)
      let date = parseInt(this.TimeService.date)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.allOrders.forEach(order => {
            let orderDeliveryDate = order.DeliveryDate[0]
            let dateSplit = orderDeliveryDate.split('T')
            let dateString = dateSplit[0]
            
            let deliveryYear = parseInt(dateString.substring(0, 4))
            let deliveryMonth = parseInt(dateString.substring(5,7))
            let deliveryDate = parseInt(dateString.substring(8,10))
          
            //date + 1 för kunder som ska leverera enligt ongoings datum
            if(deliveryYear === year && deliveryMonth === month && deliveryDate === date) {
              this.ordersToday.push(order)
            }
            
          })
          resolve('resolved')
        }, 500) 
      }).catch(e => {
        console.log(e)
      })
    }

    distributeTodaysOrders() {
      this.ordersToday.forEach(order => {
        this.customerService.customers.subscribe(customer => {
          customer.forEach(c => {
            if(order.GoodsOwnerId[0] === c.customerID) {
              //200 ok, 320 utskriven
              if(order.OrderPickability[0] === "200" || order.OrderPickability[0] === "320") {
                if(!c.hasOwnProperty('openOrdersToday')) {
                  c.openOrdersToday = []
                }

                c.openOrdersToday.push(order)
              }

              if(order.OrderStatusNumber[0] === "500") {

                if(!c.hasOwnProperty('completedOrders')) {
                  c.completedOrders = []
                } else {
                c.completedOrders.push(order)
                }
              }
            }
          })
        })
      })
    }

    getOrderNumbers(){
      this.customerService.customers.subscribe(customer => {
        customer.forEach(c => {
          if(c.hasOwnProperty('completedOrders')) {
            console.log('hej',c)
          }
        })
      })
    }


}