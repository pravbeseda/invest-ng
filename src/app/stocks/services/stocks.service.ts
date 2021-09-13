import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { StockItem } from '@models/stocks';
import { ApiStocksService } from '@api';

@Injectable()
export class StocksService {

  constructor(private apiStocksService: ApiStocksService) { }

  getStock(ticker: string): Observable<StockItem> {
    return this.apiStocksService.getStock(ticker);
  }

}
