import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CurrenciesListPage} from './pages/currencies-list/currencies-list.page';
import {CurrenciesResolver} from './resolvers/currencies.resolver';
import {CurrencyItemPage} from './pages/currency-edit/currency-item.page';

const routes: Routes = [
  {
    path: '',
    component: CurrenciesListPage,
    resolve: { currencies: CurrenciesResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':currencyId',
    component: CurrencyItemPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CurrenciesResolver]
})
export class CurrenciesRoutingModule { }
