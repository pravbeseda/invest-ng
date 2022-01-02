import { Injectable } from '@angular/core';
import {ApiPortfolioService} from '@api';
import {Observable} from 'rxjs';

@Injectable()
export class PortfolioService {

  constructor(private apiPortfolioService: ApiPortfolioService) { }

  addPortfolio(name: string): Observable<void> {
    return this.apiPortfolioService.addPortfolio(name);
  }
}
