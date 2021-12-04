import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioListPage } from "./pages/portfolio-list/portfolio-list.page";
import {AuthGuard} from '../shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PortfolioListPage,
    canActivate: [AuthGuard]
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
export class PortfolioRoutingModule { }
