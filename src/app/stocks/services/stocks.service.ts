import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Pageable, StockItem } from '@models';
import { ApiStocksService } from '@api';

@Injectable()
export class StocksService {

  constructor(private apiStocksService: ApiStocksService) { }

  getStock(id: number): Observable<StockItem> {
    return this.apiStocksService.getStock(id);
  }

  searchStock(ticker: string, driver: string): Observable<StockItem> {
    return this.apiStocksService.searchStock(ticker, driver);
  }

  addStock(stock: StockItem): Observable<void> {
    return this.apiStocksService.addStock(stock);
  }

  getStocks(): Observable<Pageable<StockItem>> {
    return this.apiStocksService.getStocks({
      stockTypes: ['Stock', 'Etf']
    });
  }

  updateStock(id: number, stock: StockItem): Observable<void> {
    return this.apiStocksService.updateStock(id, stock);
  }

  refreshPrice(id: number): Observable<number> {
    return this.apiStocksService.refreshPrice(id);
  }

}
