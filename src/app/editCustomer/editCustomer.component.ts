import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-editCustomer',
  templateUrl: './editCustomer.component.html',
  styleUrls: ['./editCustomer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  customers = []
  customer;
  

  //Skapa kund
  customerName: string
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

  sections = ['solsidan', 'dannes', 'bong']
  previousSection: string; //visar tidigare vald avdelning

  constructor(private customerService: CustomerService,
              private router: Router) { }

  ngOnInit() {
    this.customer = this.customerService.editCustomer
    this.getPreviousValues()
    
  }

  deleteContact(index) {
    this.customer.contacts.splice(index, 1)
    this.customerService.setCustomers()
  }


  //tilldela värden så att orörda fält sparas till det gamla värdet
  getPreviousValues() {
    this.customerName = this.customer.customerName
    this.customerId = this.customer.customerID
    this.section = this.customer.section
    this.contacts = this.customer.contacts
    this.cOsweden = this.customer.cOsweden
    this.cOabroad = this.customer.cOabroad
    this.cOcomments = this.customer.cOcomments
  }




  newContact() {
    if(this.firstname === undefined || this.lastname === undefined) {
      return
    }
    let customer = this.customer.contacts
    let newContact = this.createContact(this.firstname, this.lastname, this.phone, this.eMail)
    this.customer.contacts.push(newContact)
    this.customerService.setCustomers()

  }



  deleteCustomer() {
    let count = 0;
    this.router.navigate(['kunder'])
    this.customerService.customers.forEach(customer => {
      if (customer.customerName === this.customer.customerName) {
        this.customerService.customers.splice(count, 1)
        this.customerService.setCustomers()
      }
      count++
    })
  }



 
  onSubmit() {
    let count = 0;
    this.customerService.customers.forEach( customer => {
      if (customer.customerName === this.customer.customerName) {
        customer.customerName = this.customerName
        customer.customerID = this.customerId
        customer.section = this.section
        customer.contacts = this.contacts
        customer.cOsweden = this.cOsweden
        customer.cOabroad = this.cOabroad
        customer.cOcomments = this.cOcomments
        this.customerService.customers.splice(count, 1, customer)
        this.customerService.setCustomers()
      }
      count++
    })

    this.router.navigate(['kunder'])
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
    this.customerId = Id.viewModel
    console.log(this.customerId)
  }
  
  getSection(event) {
    this.section = event.source._value
    console.log(this.section)

  }
  
  getFirstname(fn) {
    this.firstname = fn.value
    console.log(this.firstname)
  }
  
  getLastname(ln) {
    this.lastname = ln.value
    console.log(this.lastname)
  }
  
  getPhone(ph) {
    this.phone = ph.value
    console.log(this.phone)
  }
  
  getEmail(em) {
    this.eMail = em.value
    console.log(this.eMail)
  }
  
  getSweden(sv) {
    this.cOsweden = sv.value
    console.log(this.cOsweden)
  }
  
  getAbroad(ab) {
    this.cOabroad = ab.value
    console.log(this.cOabroad)
  }
  
  getComments(cm) {
    this.cOcomments = cm.value
    console.log(cm)
  }

}
