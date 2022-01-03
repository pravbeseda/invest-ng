import { Injectable } from '@angular/core';
import {ApiPortfolioService} from '@api';
import {Observable} from 'rxjs';
import {Pageable} from '@models/common';
import {Portfolio} from '@models/portfolio';

@Injectable()
export class PortfolioService {

  constructor(private apiPortfolioService: ApiPortfolioService) { }

  getPortfolios(): Observable<Pageable<Portfolio>> {
    return this.apiPortfolioService.getPortfolios();
  }

  addPortfolio(name: string): Observable<void> {
    return this.apiPortfolioService.addPortfolio(name);
  }
}
