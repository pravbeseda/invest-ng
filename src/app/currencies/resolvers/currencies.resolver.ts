import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {Observable, of} from 'rxjs';
import {StockItem} from '@models/stocks';
import {CurrenciesService} from '../services/currencies.service';
import {Pageable} from '@models/common';
import {catchError} from 'rxjs/operators';

const emptyAnswer$ = of({ content: [], totalCount: 0 });

@Injectable()
export class CurrenciesResolver implements Resolve<Pageable<StockItem>> {
  constructor(private currenciesService: CurrenciesService) {}

  resolve(): Observable<Pageable<StockItem>> {
    console.log('!!!');
    return this.currenciesService.getCurrencies().pipe(catchError(() => emptyAnswer$));;
  }
}
