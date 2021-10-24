import { NgModule } from '@angular/core';
import { StocksRoutingModule } from './stocks-routing.module';
import { StocksListPage } from './pages/stocks-list/stocks-list.page';
import { StockModalComponent } from './components/stock-modal/stock-modal.component';
import { SharedModule } from '../shared/shared.module';
import { StocksService } from './services/stocks.service';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { StockListItemComponent } from './components/stock-list-item/stock-list-item.component';
import { StockItemComponent } from './pages/stock-edit/stock-item.component';

@NgModule({
  declarations: [StocksListPage, StockModalComponent, StockFormComponent, StockListItemComponent, StockItemComponent],
  imports: [
    SharedModule,
    StocksRoutingModule,
  ],
  providers: [StocksService]
})
export class StocksModule { }
