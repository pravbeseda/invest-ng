import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Deal} from '@models';

@Injectable({
  providedIn: 'root'
})
export class ApiDealsService {

  constructor(private http: HttpClient) { }

  createDeal(deal: Partial<Deal>): Observable<void> {
    const url = `/api/deals`;
    return this.http.post<void>(url, deal);
  }
}
