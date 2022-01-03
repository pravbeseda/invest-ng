import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {PortfolioService} from '../services/portfolio.service';
import {Portfolio} from '@models/portfolio';

@Injectable()
export class PortfolioResolver implements Resolve<Portfolio> {
  constructor(private portfolioService: PortfolioService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Portfolio> {
    const id = Number(route.params.portfolioId);
    return this.portfolioService.getPortfolio(id);
  }
}
