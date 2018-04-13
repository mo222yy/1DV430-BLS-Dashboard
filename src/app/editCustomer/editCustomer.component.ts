import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editCustomer',
  templateUrl: './editCustomer.component.html',
  styleUrls: ['./editCustomer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  customers = []
  customerToEdit: number; //index number
  
  
  showCustomerName: string;
  showCustomerId: string;

  showFirstname: string;
  showLastName: string;
  showPhone: string;
  showEmail: string;

  showCoSweden: string;
  showCoAbroad: string;
  showCoComments: string;


  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers() // hämta kunder
    this.getCustomerToEdit()
  }

  getCustomerToEdit() {

    let customers = this.customerService.customers // customer Array
    let customer = this.customerService.editCustomer // index number
 
    console.log(customers[customer].contacts)

    this.showCustomerName = customers[customer].customerName
    this.showCustomerId = customers[customer].customerID
    //contacts
    this.showFirstname = customers[customer].contacts[0].firstname 
    this.showLastName = customers[customer].contacts[0].lastname
    this.showPhone = customers[customer].contacts[0].phone
    this.showEmail = customers[customer].contacts[0].eMail
    //cutOffs
    this.showCoSweden = customers[customer].cOsweden
    this.showCoAbroad = customers[customer].cOabroad
    this.showCoComments = customers[customer].cOcomments

  }


  //for radiobuttons
  sections: any = [
    'solsidan',
    'dannes',
    'bong'
  ]


}
