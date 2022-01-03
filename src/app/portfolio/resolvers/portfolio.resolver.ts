import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Pageable} from '@models/common';
import {catchError} from 'rxjs/operators';
import {PortfolioService} from '../services/portfolio.service';
import {Portfolio} from '@models/portfolio';

const emptyAnswer$ = of({ content: [], totalCount: 0 });

@Injectable()
export class PortfolioResolver implements Resolve<Pageable<Portfolio>> {
  constructor(private portfolioService: PortfolioService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pageable<Portfolio>> {
    return this.portfolioService.getPortfolios().pipe(catchError(() => emptyAnswer$));;
  }
}
