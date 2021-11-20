import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StockItem } from '@models/stocks';
import {Pageable} from "@models/common";
import {StocksFilterInDto} from '@models/stocks-filter-in-dto';

@Injectable({
  providedIn: 'root'
})
export class ApiStocksService {

  constructor(private http: HttpClient) { }

  getStock(id: number): Observable<StockItem> {
    const url = `/api/stocks/${id}`;
    return this.http.get<StockItem>(url);
  }

  getStocks(body: StocksFilterInDto): Observable<Pageable<StockItem>> {
    const url = `/api/stocks`;
    return this.http.get<Pageable<StockItem>>(url, { params: { ...body } } );
  }

  searchStock(ticker: string, driver: string): Observable<StockItem> {
    const url = `/api/ticker/${ticker}/${driver}`;
    return this.http.get<StockItem>(url);
  }

  searchCurrency(name: string, driver: string): Observable<StockItem> {
    const url = `/api/currency/${name}/${driver}`;
    return this.http.get<StockItem>(url);
  }

  addStock(stock: StockItem): Observable<void> {
    const url = `/api/stocks`;
    return this.http.post<void>(url, stock);
  }

  updateStock(id: number, stock: StockItem): Observable<void> {
    const url = `/api/stocks/${id}`;
    return this.http.put<void>(url, stock);
  }

  refreshPrice(id: number): Observable<number> {
    const url = `/api/stocks/${id}/refresh-price`;
    return this.http.put<number>(url, undefined);
  }
}
