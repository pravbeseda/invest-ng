import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'portfolio',
    loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule)
  },
  {
    path: 'stocks',
    loadChildren: () => import('./stocks/stocks.module').then(m => m.StocksModule)
  },
  {
    path: 'currencies',
    loadChildren: () => import('./currencies/currencies.module').then(m => m.CurrenciesModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule)
  },
  {
    path: '**',
    redirectTo: 'portfolio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
