import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot, AngularFireObject } from 'angularfire2/database'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FirebaseApp } from '@firebase/app-types';
import { FirebaseDatabase } from '@firebase/database-types';

@Injectable()
export class CustomerService {

  private basePath: string = '/customers'
  customersRef: AngularFireList<any>
  customers: Observable<any[]>;
 
  currentKey;
  currentCustomer;

  customer
  
  ref
  
  constructor(private db: AngularFireDatabase) {
    
    this.customersRef = db.list('customers')
    this.customers = this.customersRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() })) 
      )
    )
  
    //this.customers = db.list('customers').valueChanges()
   }

   createCustomer(value) {
     this.customersRef.push(value)
   }


   getCustomers() {
    return this.customers
   }

   getCustomer(key: string): AngularFireObject<any> {
    

    const customerPath = `${this.basePath}/${this.currentKey}`
    
    this.customer = this.db.object(customerPath)
    
    return this.customer
    
  }


}
