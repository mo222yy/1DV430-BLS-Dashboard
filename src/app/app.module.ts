import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Routes } from '@angular/router';
import { Chart } from 'chart.js'


import { HttpHandler } from '@angular/common/http';
import { OrdersService } from './orders.service'
import { CustomerService } from './customer.service'
import { TimeService } from './time.service'
import { ReactiveFormsModule } from '@angular/forms'
import { TransporterService } from './transporter.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';


import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/collections';
import {MatButtonToggleModule} from '@angular/material/button-toggle';






import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UtleveransComponent } from './utleverans/utleverans.component';
import { StatistikComponent } from './statistik/statistik.component';
import { InformationComponent } from './information/information.component';
import { KunderComponent } from './kunder/kunder.component';
import { SkapakundComponent } from './skapakund/skapakund.component';
import { EditCustomerComponent } from './editCustomer/editCustomer.component';
import { ClockComponent } from './clock/clock.component';


@NgModule({
  declarations: [
    AppComponent,
    UtleveransComponent,
    StatistikComponent,
    InformationComponent,
    KunderComponent,
    SkapakundComponent,
    EditCustomerComponent,
    ClockComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    RouterModule,
    RouterTestingModule,
    MatDividerModule,
    CdkTableModule,
    MatButtonToggleModule
        
    
  ],

  providers: [OrdersService, CustomerService, TimeService, TransporterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
