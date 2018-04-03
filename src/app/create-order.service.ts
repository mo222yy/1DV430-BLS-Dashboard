import { Injectable } from '@angular/core';

@Injectable()
export class CreateOrderService {

  //Klass för att skapa order object

  constructor( ) { }

  order(goodsOwnerID,
        orderID,
        GoodsOwnerOrderNumber,
        orderPickability
        /*
        OrderStatusNumber,
        DeliveryDate,
        Created,
        CountryCode,
        PickedNumberOfItems,
        OrderedNumberOfItems,
        NumberOfOrderLines,
        Transporter,
        NumberOfPickedOrderLines,
        OrderLines
        */
      ) 
        {
    let order = {
      goodsOwnerID: goodsOwnerID,
      orderID: orderID,
      GoodsOwnerOrderNumber: GoodsOwnerOrderNumber,
      orderPickability: orderPickability
      /*
      OrderStatusNumber: OrderStatusNumber,
      DeliveryDate: DeliveryDate,
      Created: Created,
      CountryCode: CountryCode,
      PickedNumberOfItems: PickedNumberOfItems,
      OrderedNumberOfItems: OrderedNumberOfItems,
      NumberOfOrderLines: NumberOfOrderLines,
      Transporter: Transporter,
      NumberOfPickedOrderLines: NumberOfPickedOrderLines,
      OrderLines: OrderLines
      */
    }
    return order
  }

}
