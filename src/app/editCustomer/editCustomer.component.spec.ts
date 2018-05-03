import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { EditCustomerComponent } from './editCustomer.component';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import { CustomerService } from '../customer.service';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditCustomerComponent', () => {
  let component: EditCustomerComponent;
  let fixture: ComponentFixture<EditCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatFormFieldModule,MatInputModule, BrowserAnimationsModule, MatRadioModule, MatListModule,RouterTestingModule],
      declarations: [ EditCustomerComponent ],
      providers: [CustomerService, EditCustomerComponent],
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

})