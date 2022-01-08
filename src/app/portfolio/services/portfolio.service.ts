import { Injectable } from '@angular/core';
import {ApiDealsService, ApiPortfolioService, ApiStocksService} from '@api';
import {Observable} from 'rxjs';
import {Deal, Pageable, Portfolio, StockItem} from '@models';
import {map} from 'rxjs/operators';

@Injectable()
export class PortfolioService {

  constructor(
    private apiPortfolioService: ApiPortfolioService,
    private apiStocksService: ApiStocksService,
    private apiDealsService: ApiDealsService,
  ) { }

  getPortfolios(): Observable<Pageable<Portfolio>> {
    return this.apiPortfolioService.getPortfolios();
  }

  getPortfolio(id: number): Observable<Portfolio> {
    return this.apiPortfolioService.getPortfolio(id);
  }

  addPortfolio(portfolio: Partial<Portfolio>): Observable<void> {
    return this.apiPortfolioService.addPortfolio(portfolio);
  }

  updatePortfolio(portfolio: Partial<Portfolio>): Observable<void> {
    return this.apiPortfolioService.updatePortfolio(portfolio);
  }

  getPortfolioStocks(): Observable<StockItem[]> {
    return this.apiStocksService.getStocks().pipe(map(r => r.content));
  }

  createDeal(deal: Partial<Deal>): Observable<void> {
    return this.apiDealsService.createDeal(deal);
  }
}
