import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StockItem } from '@models/stocks';
import {Pageable} from "@models/common";

@Injectable({
  providedIn: 'root'
})
export class ApiStocksService {

  constructor(private http: HttpClient) { }

  getStock(ticker: string): Observable<StockItem> {
    const url = `/api/stock/ticker/${ticker}`;
    return this.http.get<StockItem>(url);
  }

  addStock(stock: StockItem): Observable<void> {
    const url = `/api/stock`;
    return this.http.post<void>(url, stock);
  }

  getStocks(): Observable<Pageable<StockItem>> {
    const url = `/api/stocks`;
    return this.http.get<Pageable<StockItem>>(url);
  }

}