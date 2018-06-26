import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';  



@Component({
  selector: 'skapakund',
  templateUrl: './skapakund.component.html',
  styleUrls: ['./skapakund.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class SkapakundComponent{

  orders = {}

  contacts = []
  firstname: string;
  lastname: string;
  phone: string;
  email: string;

  constructor( private customerService: CustomerService,
               private router: Router) { }

onSubmit() {

}

createCustomer(value) {
 delete value.firstname
 delete value.lastname
 delete value.phone
 delete value.email

 value.contacts = this.contacts
 value.ordersOpenToday = []
 value.ordersCompletedToday = []
 value.ordersLinesCompletedToday = []
 value.orderLinesOpenToday = []
 value.abroadOrders = []
 value.restedOrders = []
 value.ordersCompletedMonth = []
 value.ordersLinesCompletedToday = []


 this.customerService.createCustomer(value)
 console.log(value)
}


addOrders() {
  
  let ordersOpenToday = []
  let ordersCompletedToday = []
  let orderLinesOpenToday = []
  let ordersLinesCompletedToday = []

  let abroadOrders = []
  let rested = []

  let ordersCompletedMonth = []
  let orderLinesCompletedMonth = []
  


}

addContact() {
  let contact = this.createContact()
  this.contacts.push(contact)
}

createContact() {
  return {firstname: this.firstname, lastname: this.lastname, phone: this.phone, email: this.email}
}

getFirstname(firstname) {
  this.firstname = firstname.value
}

getLastname(lastname) {
  this.lastname = lastname.value
}

getPhone(phone) {
  this.phone = phone.value
}

getEmail(email) {
  this.email = email.value
}
stepBack() {
  setTimeout(() => {
    this.router.navigate(['kunder'])
  }, 0)
}


}
