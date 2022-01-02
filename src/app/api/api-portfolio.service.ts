import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Pageable} from '@models/common';
import {Portfolio} from '@models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class ApiPortfolioService {

  constructor(private http: HttpClient) { }

  getPortfolios(): Observable<Pageable<Portfolio>> {
    const url = `/api/portfolios`;
    return this.http.get<Pageable<Portfolio>>(url, undefined);
  }

  addPortfolio(name: string): Observable<void> {
    const url = `/api/portfolio`;
    return this.http.post<void>(url, { name });
  }
}
