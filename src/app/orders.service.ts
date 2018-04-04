import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateOrderService } from './create-order.service'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

// Service för att hämta info om ordrar och skapa objekt

@Injectable()
export class OrdersService {


  orderArray: Object[] = [];

  constructor(private http: HttpClient,
              private createOrder: CreateOrderService) { }



    filterOrders() {
   // let orderArray: Array<Object> = []
      // hämta fil
     this.http.get('https://raw.githubusercontent.com/1dv430/mo222yy-project/master/Orders.xml?token=Ad3tHpXUsalyr-TOX60462liv-PHdQBLks5azfyawA%3D%3D', {responseType: 'text' }).subscribe(data => {
    console.log(data)
      // splitta ordrar i xml string
    let xml = data.split('<BorjesDashBoardOrder>', 100)
    
    //ta bort första, vet ej vad det är??
    xml.splice(0,1)

    //för varje xml element skapa en order
    //fortsätt här, bättre sätt att plocka ut data?? funkar det med alla filer? har alla egenskaper samma antal siffror ?
    xml.forEach(el => {
      let goodsOwnerID = parseInt(el.slice(22,25))
      let orderID = parseInt(el.slice(57, 63))
      let GoodsOwnerOrderNumber = parseInt(el.slice(104, 108))
      let orderPickability = parseInt(el.slice(158,161))

      let tempOrder = this.createOrder.order(
        goodsOwnerID,
        orderID,
        GoodsOwnerOrderNumber,
        orderPickability
      )
     this.orderArray.push(tempOrder)
    })

    //FILTRERA ORDRAR OCH LÄGG TILL I ARRAYS
    this.orderArray.forEach(el => {
    })

    });
  } 


}
