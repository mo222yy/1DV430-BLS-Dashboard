import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtleveransComponent } from './utleverans/utleverans.component';
import { InleveransComponent } from './inleverans/inleverans.component';
import { ReturComponent } from './retur/retur.component';
import { StatistikComponent } from './statistik/statistik.component';
import { InformationComponent } from './information/information.component';
import { KunderComponent } from './kunder/kunder.component';

const routes: Routes = [
  {
    path: 'utleverans',
    component: UtleveransComponent
  },
  {
    path: 'inleverans',
    component: InleveransComponent
  },
  {
    path: 'retur',
    component: ReturComponent
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
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
