import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomerService } from '../customer.service';

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

onSubmit() {
let contact = this.createContact(this.firstname, this.lastname, this.phone, this.eMail)



}

createContact(firstname, lastname, phone, eMail) {
  return {
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    eMail: eMail
  }
}

getCustomerName(name) {
  this.customerName = name.value
}

getCustomerId(Id) {
  this.customerId = Id.value
}

getSection(event) {
  this.section = event.target.value
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



//for radiobuttons
  sections: any = [
    'solsidan',
    'dannes',
    'bong'
  ]

}
