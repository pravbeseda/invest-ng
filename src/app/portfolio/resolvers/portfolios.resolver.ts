import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Pageable, Portfolio} from '@models';
import {catchError} from 'rxjs/operators';
import {PortfolioService} from '../services/portfolio.service';

const emptyAnswer$ = of({ content: [], totalCount: 0 });

@Injectable()
export class PortfoliosResolver implements Resolve<Pageable<Portfolio>> {
  constructor(private portfolioService: PortfolioService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pageable<Portfolio>> {
    return this.portfolioService.getPortfolios().pipe(catchError(() => emptyAnswer$));
  }
}
