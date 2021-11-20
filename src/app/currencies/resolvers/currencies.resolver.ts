import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {StockItem} from '@models/stocks';
import {CurrencyService} from '../services/currency.service';
import {Pageable} from '@models/common';
import {catchError} from 'rxjs/operators';

const emptyAnswer$ = of({ content: [], totalCount: 0 });

@Injectable()
export class CurrenciesResolver implements Resolve<Pageable<StockItem>> {
  constructor(private currenciesService: CurrencyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pageable<StockItem>> {
    return this.currenciesService.getCurrencies().pipe(catchError(() => emptyAnswer$));;
  }
}
