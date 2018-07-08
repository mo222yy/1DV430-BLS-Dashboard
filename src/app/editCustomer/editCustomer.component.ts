import { Component, OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';  
import { KunderComponent } from '../kunder/kunder.component';


@Component({
  selector: 'app-editCustomer',
  templateUrl: './editCustomer.component.html',
  styleUrls: ['./editCustomer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  currentCustomer: object;

  customerName: String;
  customerID: String;
  section: String;
  shortname: String;
  sop: String;
  logo: String;
  contacts = []
  cosv: String;
  coab: String;
  comments: String;
  deliverDate: String;

  firstname: String;
  lastname: String;
  phone: String;
  email: String;


  constructor(private CustomerService: CustomerService,
              private router: Router,
              ) {
               

          }

  ngOnInit () {
    this.getCustomer()

  }

  getCustomer() {
    this.CustomerService.customers.subscribe(customer => {
      customer.forEach(c => {
        if(c.key === this.CustomerService.currentKey) {
          this.currentCustomer = c
          this.customerName = c.customerName
          this.customerID = c.customerID
          this.section = c.section
          this.shortname = c.shortname
          this.sop = c.sop
          this.logo = c.logo
          this.cosv = c.cosv
          this.coab = c.coab
          this.deliverDate = c.deliverDate
          this.comments = c.comments
          if(c.contacts === null) {
            this.contacts = []
          } else {
            this.contacts = c.contacts
          }
        }
      })
    })
  }

  updateCustomer(value) {
    this.CustomerService.customersRef.update(this.CustomerService.currentKey, {
      customerName: this.customerName,
      customerID: this.customerID,
      section: this.section,
      sop: this.sop,
      shortname: this.shortname,
      logo: this.logo,
      contacts: this.contacts,
      cosv: this.cosv,
      coab: this.coab,
      comments: this.comments,
      deliverDate: this.deliverDate
      })
      console.log(value)
      this.router.navigate(['kunder'])


  }

  deleteCustomer() {
    this.CustomerService.customersRef.remove(this.CustomerService.currentKey)
    this.router.navigate(['kunder'])
  }

  updateCustomerName(name) {
    this.customerName = name.value
    console.log(this.customerName)
  }
  updateCustomerID(id) {
    this.customerID = id.value
    console.log(this.customerID)

  }
  updateSection(section) {
    this.section = section.value
    console.log(this.section)

  }
  updateSop(sop) {
    this.sop = sop.value
    console.log(this.sop)

  }
  updateLogo(logo) {
    this.logo = logo.value
    console.log(this.logo)
  }

  updateCosv(cosv) {
    this.cosv = cosv.value
    console.log(this.cosv)
  }

  updateCoab(coab) {
    this.coab = coab.value
    console.log(this.coab)
  }

  updateComments(comments) {
    this.comments = comments.value
    console.log(this.comments)
  }

  updateFirstname(firstname) {
    this.firstname = firstname.value
    console.log(this.firstname)

  }

  updateShortname(shortname) {
    this.shortname = shortname.value
  }

  updateDeliverDate(deliverDate) {
    this.deliverDate = deliverDate.value
  }

  addContact() {
    let contact = this.createContact()
    this.contacts.push(contact)
  }
  
  createContact() {
    return {firstname: this.firstname, lastname: this.lastname, phone: this.phone, email: this.email}
  }
  

  updateLastname(lastname) {
    this.lastname = lastname.value
    console.log(this.lastname)

  }

  updatePhone(phone) {
    this.phone = phone.value
    console.log(this.phone)

  }

  updateEmail(email) {
    this.email = email.value
    console.log(this.email)
  }

  

  deleteContact(index) {
    this.contacts.splice(index, 1)
  }


}



