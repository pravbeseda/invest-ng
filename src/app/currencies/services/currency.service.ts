import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { StockItem, Pageable } from '@models';
import { ApiStocksService } from '@api';

@Injectable()
export class CurrencyService {

  constructor(private apiStocksService: ApiStocksService) { }

  getCurrency(id: number): Observable<StockItem> {
    return this.apiStocksService.getStock(id);
  }

  getCurrencies(): Observable<Pageable<StockItem>> {
    return this.apiStocksService.getStocks({
      stockTypes: ['Currency']
    });
  }

  search(name: string, driver: string): Observable<StockItem> {
    return this.apiStocksService.searchCurrency(name, driver);
  }

  add(stock: StockItem): Observable<void> {
    return this.apiStocksService.addStock(stock);
  }

  update(id: number, stock: StockItem): Observable<void> {
    return this.apiStocksService.updateStock(id, stock);
  }

  refreshPrice(id: number): Observable<number> {
    return this.apiStocksService.refreshPrice(id);
  }

}
