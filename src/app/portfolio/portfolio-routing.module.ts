import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioListPage } from "./pages/portfolio-list/portfolio-list.page";
import {AuthGuard} from '@shared/services/auth.guard';
import {PortfolioResolver} from './resolvers/portfolio.resolver';

const routes: Routes = [
  {
    path: '',
    component: PortfolioListPage,
    canActivate: [AuthGuard],
    resolve: { portfolios: PortfolioResolver },
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
  providers: [PortfolioResolver]
})
export class PortfolioRoutingModule { }
