import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { ExchangerComponent } from './exchanger/exchanger.component';
import { CurrencyComponent } from './currency/currency.component';

const routes: Routes = [
  {
    path: 'exchangers',
    component: ExchangerComponent,
  },
  {
    path: 'cities',
    component: CitiesComponent
  },
  {
    path: 'currencies',
    component: CurrencyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }
