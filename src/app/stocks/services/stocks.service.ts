import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { StockItem } from '@models/stocks';
import { ApiStocksService } from '@api';
import {Pageable} from "@models/common";

@Injectable()
export class StocksService {

  constructor(private apiStocksService: ApiStocksService) { }

  getStock(ticker: string): Observable<StockItem> {
    return this.apiStocksService.getStock(ticker);
  }

  addStock(stock: StockItem): Observable<void> {
    return this.apiStocksService.addStock(stock);
  }

  getStocks(): Observable<Pageable<StockItem>> {
    return this.apiStocksService.getStocks();
  }

}
