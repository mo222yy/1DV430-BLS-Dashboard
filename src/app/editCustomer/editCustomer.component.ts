import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';  
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database'
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-editCustomer',
  templateUrl: './editCustomer.component.html',
  styleUrls: ['./editCustomer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  customers: Observable<any[]>;

  currentCustomer: Observable<AngularFireAction<any>[]>;
  customerToEdit: BehaviorSubject<string|null>;

  constructor(private customerService: CustomerService,
              private router: Router,
              db: AngularFireDatabase) {
       
          }

  ngOnInit() {
    

  }
}
