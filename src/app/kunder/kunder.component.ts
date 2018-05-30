import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service'
import { SkapakundComponent } from '../skapakund/skapakund.component'
import { Router } from '@angular/router';  
import { MatCheckboxModule } from '@angular/material/checkbox'
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-kunder',
  templateUrl: './kunder.component.html',
  styleUrls: ['./kunder.component.scss']
})
export class KunderComponent implements OnInit {
  customers = []

  left = []
  middle = []
  right = []

  solsidan = []
  dannes = []
  bong = []

  constructor(private CustomerService: CustomerService,
              private router: Router,
             ) { }

  ngOnInit() {
    this.CustomerService.getCustomers()
    this.CustomerService.setCustomers()
    this.solsidan = this.CustomerService.solsidan
    this.dannes = this.CustomerService.dannes
    this.bong = this.CustomerService.bong
    this.divideLists()

    this.customers = this.CustomerService.customers
  }

  divideLists() {
    let customers = this.CustomerService.customers
    let sorted = customers.sort(function(a,b) {
      var nameA= a.customerName.toLowerCase(), nameB= b.customerName.toLowerCase();
      if (nameA < nameB) 
       return -1;
      if (nameA > nameB)
       return 1;
      return 0;
    })

    let customersDivided = customers.length / 3

    this.left = customers.slice(0, customersDivided)
    this.middle = customers.slice(customersDivided, customersDivided * 2)
    this.right = customers.slice(customersDivided *2, customersDivided * 3)
    
  }

  editCustomer(customerName) {
    console.log(customerName)
    this.CustomerService.customers.forEach(customer => {
      if (customer.customerName === customerName) {
        this.CustomerService.editCustomer = customer
      }
    })
    
    //this.CustomerService.editCustomer = ev
    this.router.navigate(['editCustomer'])
  }

  createCustomer() {
    this.router.navigate(['skapakund'])
  }

  sortCustomers(arr) {
    arr.sort(function(a, b) {
      return b- a
    })
    console.log(arr)

  }
}
