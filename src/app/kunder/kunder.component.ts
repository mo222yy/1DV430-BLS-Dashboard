import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service'
import { Router } from '@angular/router';  
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kunder',
  templateUrl: './kunder.component.html',
  styleUrls: ['./kunder.component.scss']
})
export class KunderComponent implements OnInit {
  customers: Observable<any[]>;

 
  constructor(private CustomerService: CustomerService,
              private router: Router,
             ) { }

  ngOnInit() {
    this.customers = this.CustomerService.customers
  }

  createCustomer() {
    this.router.navigate(['skapakund'])
  }

  getCustomer(key) {
    this.CustomerService.currentKey = key
    this.CustomerService.getCustomer(key)
    this.router.navigate(['editCustomer'])
  }

  


}
