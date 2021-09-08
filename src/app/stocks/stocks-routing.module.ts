import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksListPage } from './pages/stocks-list/stocks-list.page';

const routes: Routes = [
  {
    path: '',
    component: StocksListPage
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
