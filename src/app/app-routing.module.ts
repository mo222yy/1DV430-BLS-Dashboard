import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtleveransComponent } from './utleverans/utleverans.component';
import { StatistikComponent } from './statistik/statistik.component';
import { InformationComponent } from './information/information.component';
import { KunderComponent } from './kunder/kunder.component';
import { SkapakundComponent } from './skapakund/skapakund.component'
import { EditCustomerComponent } from './editCustomer/editCustomer.component'

const routes: Routes = [
  {
    path: 'utleverans',
    component: UtleveransComponent
  },
  {
    path: 'statistik',
    component: StatistikComponent
  },
  {
    path: 'information',
    component: InformationComponent
    },
  {
    path: 'kunder',
    component: KunderComponent
  },
  {
    path: 'skapakund',
    component: SkapakundComponent
  },
  {
    path: 'editCustomer',
    component: EditCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
