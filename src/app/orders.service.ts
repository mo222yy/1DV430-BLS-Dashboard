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
  customerList = []; //filtrerar alla kunder med ordrar till array
  allOrders = [];


  constructor(private http: HttpClient,
              private customerService: CustomerService,
              private TimeService: TimeService,
              db: AngularFireDatabase
               ) { }

   
    async getOrders() {
      
      let parseString = require('xml2js').parseString
      const url = 'https://firebasestorage.googleapis.com/v0/b/borjesdb.appspot.com/o/Orders2.xml?alt=media&token=91410894-430e-4442-b2f6-ee258eacc978'
      const url2 = 'https://raw.githubusercontent.com/mo222yy/dashboard/master/Orders.xml'
      let json;
  
      try {

      let getXml = await this.http.get(url2, { responseType: 'text' })
     .subscribe( data => {
      console.log(data)

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

        for(let i = 0; i < orders.length / 1.2; i++) {
          let date = orders[i].DeliveryDate[0].split("T")
          let today = this.TimeService.year + "-" + this.TimeService.month + "-00T" + date[1]
          orders[i].DeliveryDate[0] = today
        }
        
        this.allOrders = orders
       return this.allOrders
     })
   
    } catch (error) {
      console.log(error)
    }
  }

  async customerOrdersToday () {
 
  }

}
