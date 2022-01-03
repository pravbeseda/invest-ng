import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioListPage } from "./pages/portfolio-list/portfolio-list.page";
import {AuthGuard} from '@shared/services/auth.guard';
import {PortfoliosResolver} from './resolvers/portfolios.resolver';
import {PortfolioItemPage} from './pages/portfolio-item/portfolio-item.page';
import {PortfolioResolver} from './resolvers/portfolio.resolver';

const routes: Routes = [
  {
    path: '',
    component: PortfolioListPage,
    canActivate: [AuthGuard],
    resolve: { portfolios: PortfoliosResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':portfolioId',
    canActivate: [AuthGuard],
    component: PortfolioItemPage,
    resolve: { portfolio: PortfolioResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PortfoliosResolver, PortfolioResolver]
})
export class PortfolioRoutingModule { }
