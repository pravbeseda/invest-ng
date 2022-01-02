import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {StockItem} from '@models/stocks';
import {Pageable} from '@models/common';
import {catchError} from 'rxjs/operators';
import {PortfolioService} from '../services/portfolio.service';

const emptyAnswer$ = of({ content: [], totalCount: 0 });

@Injectable()
export class PortfolioResolver implements Resolve<Pageable<StockItem>> {
  constructor(private portfolioService: PortfolioService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pageable<StockItem>> {
    return this.portfolioService.getPortfolios().pipe(catchError(() => emptyAnswer$));;
  }
}
