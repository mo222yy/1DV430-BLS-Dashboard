import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OrdersService } from './orders.service'
import { CreateOrderService } from './create-order.service'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UtleveransComponent } from './utleverans/utleverans.component';
import { InleveransComponent } from './inleverans/inleverans.component';
import { ReturComponent } from './retur/retur.component';
import { StatistikComponent } from './statistik/statistik.component';
import { InformationComponent } from './information/information.component';
import { KunderComponent } from './kunder/kunder.component';


@NgModule({
  declarations: [
    AppComponent,
    UtleveransComponent,
    InleveransComponent,
    ReturComponent,
    StatistikComponent,
    InformationComponent,
    KunderComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [OrdersService, CreateOrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
