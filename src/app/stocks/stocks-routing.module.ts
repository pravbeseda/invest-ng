import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksListPage } from './pages/stocks-list/stocks-list.page';
import {StockItemComponent} from './pages/stock-edit/stock-item.component';
import {AuthGuard} from '../shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: StocksListPage,
    canActivate: [AuthGuard],
  },
  {
    path: ':stockId',
    component: StockItemComponent,
    canActivate: [AuthGuard],
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
