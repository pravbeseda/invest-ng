import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { StockItem } from '@models/stocks';
import { ApiStocksService } from '@api';
import {Pageable} from "@models/common";

@Injectable()
export class CurrenciesService {

  constructor(private apiStocksService: ApiStocksService) { }

  getCurrency(id: number): Observable<StockItem> {
    return this.apiStocksService.getStock(id);
  }

  getCurrencies(): Observable<Pageable<StockItem>> {
    return this.apiStocksService.getStocks({
      stockTypes: ['currency']
    });
  }

  search(ticker: string, driver: string): Observable<StockItem> {
    return this.apiStocksService.searchStock(ticker, driver);
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
