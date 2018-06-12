import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable()
export class CustomerService {

  customersRef: AngularFireList<any>
  customers: Observable<any[]>;
 
  currentKey: string;

  constructor(db: AngularFireDatabase) {
    this.customersRef = db.list('customers')
    this.customers = this.customersRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() })) 
      )
    )
   }

   createCustomer(value) {
     this.customersRef.push(value)
   }



}
