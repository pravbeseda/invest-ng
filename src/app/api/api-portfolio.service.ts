import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiPortfolioService {

  constructor(private http: HttpClient) { }

  addPortfolio(name: string): Observable<void> {
    const url = `/api/portfolio`;
    return this.http.post<void>(url, name);
  }
}
