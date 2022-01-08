import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Pageable, Portfolio} from '@models';

@Injectable({
  providedIn: 'root'
})
export class ApiPortfolioService {

  constructor(private http: HttpClient) { }

  getPortfolios(): Observable<Pageable<Portfolio>> {
    const url = `/api/portfolios`;
    return this.http.get<Pageable<Portfolio>>(url);
  }

  getPortfolio(id: number): Observable<Portfolio> {
    const url = `/api/portfolios/${id}`;
    return this.http.get<Portfolio>(url);
  }

  addPortfolio(portfolio: Partial<Portfolio>): Observable<void> {
    const url = `/api/portfolios`;
    return this.http.post<void>(url, portfolio);
  }

  updatePortfolio(portfolio: Partial<Portfolio>): Observable<void> {
    const url = `/api/portfolios`;
    return this.http.put<void>(url, portfolio);
  }
}
