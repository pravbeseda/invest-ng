import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CurrenciesListPage} from './pages/currencies-list/currencies-list.page';
import {CurrenciesResolver} from './resolvers/currencies.resolver';

const routes: Routes = [
  {
    path: '',
    component: CurrenciesListPage,
    resolve: { currencies: CurrenciesResolver },
    runGuardsAndResolvers: 'always',
  },
  /*{
    path: ':stockId',
    component: StockItemComponent,
  },*/
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrenciesRoutingModule { }
