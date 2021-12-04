import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CurrenciesListPage} from './pages/currencies-list/currencies-list.page';
import {CurrenciesResolver} from './resolvers/currencies.resolver';
import {CurrencyItemPage} from './pages/currency-edit/currency-item.page';
import {AuthGuard} from '../shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CurrenciesListPage,
    canActivate: [AuthGuard],
    resolve: { currencies: CurrenciesResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':currencyId',
    canActivate: [AuthGuard],
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
