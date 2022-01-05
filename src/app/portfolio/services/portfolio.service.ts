import { Injectable } from '@angular/core';
import {ApiPortfolioService, ApiStocksService} from '@api';
import {Observable} from 'rxjs';
import {Pageable} from '@models/common';
import {Portfolio} from '@models/portfolio';
import {StockItem} from '@models/stocks';
import {map} from 'rxjs/operators';

@Injectable()
export class PortfolioService {

  constructor(private apiPortfolioService: ApiPortfolioService, private apiStocksService: ApiStocksService) { }

  getPortfolios(): Observable<Pageable<Portfolio>> {
    return this.apiPortfolioService.getPortfolios();
  }

  getPortfolio(id: number): Observable<Portfolio> {
    return this.apiPortfolioService.getPortfolio(id);
  }

  addPortfolio(name: string): Observable<void> {
    return this.apiPortfolioService.addPortfolio(name);
  }

  getPortfolioStocks(): Observable<StockItem[]> {
    return this.apiStocksService.getStocks().pipe(map(r => r.content));
  }
}
