import { Injectable } from '@angular/core';
import {ApiStocksService } from '../../api/api-stocks.service';
import {Observable} from "rxjs";
import {StockItem} from "../../../models/stocks";

@Injectable()
export class StocksService {

  constructor(private apiStocksService: ApiStocksService) { }

  getStock(ticker: string): Observable<StockItem> {
    return this.apiStocksService.getStock(ticker);
  }

}
