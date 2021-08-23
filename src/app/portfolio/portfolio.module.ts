import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioListPage } from './pages/portfolio-list/portfolio-list.page';
import { PortfolioRoutingModule } from './portfolio-routing.module';



@NgModule({
  declarations: [
    PortfolioListPage
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule
  ]
})
export class PortfolioModule { }
