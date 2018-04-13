import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service'
import { SkapakundComponent } from '../skapakund/skapakund.component'
import { Router } from '@angular/router';  

@Component({
  selector: 'app-kunder',
  templateUrl: './kunder.component.html',
  styleUrls: ['./kunder.component.scss']
})
export class KunderComponent implements OnInit {
  customers = []

  constructor(private CustomerService: CustomerService,
              private router: Router,
             ) { }

  ngOnInit() {
    let savedCustomers = localStorage.getItem("savedCustomers")
    this.customers = JSON.parse(savedCustomers)
  }

  editCustomer(ev) {
    this.CustomerService.editCustomer = ev
    this.router.navigate(['editCustomer'])
  }

  createCustomer() {
    this.router.navigate(['skapakund'])
  }
  
  
}
