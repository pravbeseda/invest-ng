import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksRoutingModule } from './stocks-routing.module';
import { StocksListPage } from './pages/stocks-list/stocks-list.page';

@NgModule({
  declarations: [StocksListPage],
  imports: [
    CommonModule,
    StocksRoutingModule
  ]
})
export class StocksModule { }
