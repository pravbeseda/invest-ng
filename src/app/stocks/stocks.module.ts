import { NgModule } from '@angular/core';
import { StocksRoutingModule } from './stocks-routing.module';
import { StocksListPage } from './pages/stocks-list/stocks-list.page';
import { StockModalComponent } from './components/stock-modal/stock-modal.component';
import { SharedModule } from '../shared/shared.module';
import { StocksService } from './services/stocks.service';

@NgModule({
  declarations: [StocksListPage, StockModalComponent],
  imports: [
    SharedModule,
    StocksRoutingModule,
  ],
  providers: [StocksService]
})
export class StocksModule { }
