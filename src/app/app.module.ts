import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OrdersService } from './orders.service'
import { CustomerService } from './customer.service'
import { TimeService } from './time.service'
import { ReactiveFormsModule } from '@angular/forms'
import { TransporterService } from './transporter.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';



import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UtleveransComponent } from './utleverans/utleverans.component';
import { InleveransComponent } from './inleverans/inleverans.component';
import { ReturComponent } from './retur/retur.component';
import { StatistikComponent } from './statistik/statistik.component';
import { InformationComponent } from './information/information.component';
import { KunderComponent } from './kunder/kunder.component';
import { SkapakundComponent } from './skapakund/skapakund.component';
import { FormsModule } from '@angular/forms';
import { EditCustomerComponent } from './editCustomer/editCustomer.component'

@NgModule({
  declarations: [
    AppComponent,
    UtleveransComponent,
    InleveransComponent,
    ReturComponent,
    StatistikComponent,
    InformationComponent,
    KunderComponent,
    SkapakundComponent,
    EditCustomerComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule

  ],
  providers: [OrdersService, CustomerService, TimeService, TransporterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
