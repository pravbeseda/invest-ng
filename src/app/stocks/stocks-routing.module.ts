import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksListPage } from './pages/stocks-list/stocks-list.page';
import {StockItemComponent} from './pages/stock-edit/stock-item.component';

const routes: Routes = [
  {
    path: '',
    component: StocksListPage,
  },
  {
    path: ':stockId',
    component: StockItemComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
