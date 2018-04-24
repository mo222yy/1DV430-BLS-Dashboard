import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';  

@Component({
  selector: 'skapakund',
  templateUrl: './skapakund.component.html',
  styleUrls: ['./skapakund.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SkapakundComponent{


  customerName: string;
  customerId: string;
  section: string;
  contacts = []


  //for contacts
  firstname: string;
  lastname: string;
  phone: string;
  eMail: string;

  //for cutOffs
  cOsweden: string;
  cOabroad: string;
  cOcomments: string;

  //orders
  openOrders = []
  abroadOrders = []
  restOrders = []
  orderLines = []

  sections = ['Solsidan', 'Dannes', 'Bong']

  constructor( private customerService: CustomerService,
               private router: Router) { }

onSubmit() {
let customer = this.customerService.customer(
  this.customerName,
  this.customerId,
  this.section,
  this.contacts,
  this.cOsweden,
  this.cOabroad,
  this.cOcomments,
  this.openOrders = [],
  this.abroadOrders = [],
  this.restOrders = [],
  this.orderLines = []
)
this.router.navigate(['kunder'])

}


newContact() {
  let newContact = this.createContact(this.firstname, this.lastname, this.phone, this.eMail)
  this.contacts.push(newContact)
}

deleteContact(index) {
  this.contacts.splice(index, 1)
}


createContact(firstname, lastname, phone, eMail) {
  return {
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    eMail: eMail
  }
}

stepBack() {
  this.router.navigate(['kunder'])
}


getCustomerName(name) {
  this.customerName = name.value
}


getCustomerId(Id) {
  this.customerId = Id.value
}

getSection(event) {
  this.section = event.source._value
}

getFirstname(fn) {
  this.firstname = fn.value
}

getLastname(ln) {
  this.lastname = ln.value
}

getPhone(ph) {
  this.phone = ph.value
}

getEmail(em) {
  this.eMail = em.value
}

getSweden(sv) {
  this.cOsweden = sv.value
}

getAbroad(ab) {
  this.cOabroad = ab.value
}

getComments(cm) {
  this.cOcomments = cm.value
}


}
