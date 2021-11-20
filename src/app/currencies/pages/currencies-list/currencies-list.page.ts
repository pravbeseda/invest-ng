import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, pluck} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Intent} from '@models/common';
import {StockItem} from '@models/stocks';
import {SearchCurrencyInDto} from '../../models/SearchCurrencyInDto';
import {CurrencyService} from '../../services/currency.service';
import {ToastrService} from 'ngx-toastr';
import {BindQueryParamsService} from '../../../shared/services/bind-query-params.service';

@Component({
  selector: 'app-currencies-list',
  templateUrl: './currencies-list.page.html',
  styleUrls: ['./currencies-list.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrenciesListPage implements OnInit {
  readonly currencies$: Observable<StockItem[]> = this.route.data.pipe(pluck('currencies'), map(v => v.content));
  readonly trackById = (_: number, { id }: StockItem) => id;
  isOpenedModal = false;

  constructor(
    private route: ActivatedRoute,
    private currencyService: CurrencyService,
    private bindQueryParamsService: BindQueryParamsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  openModal() {
    this.isOpenedModal = true;
  }

  closeModal() {
    this.isOpenedModal = false;
  }

  loadCurrency(intent: Intent<SearchCurrencyInDto>) {
    this.currencyService.search(intent.name, intent.driver).subscribe(r => {
      if (!!r) {
        intent.onSuccess(r);
      } else {
        this.toastr.error('Ничего не найдено');
      }
    });
  }

  saveCurrency(currency: StockItem) {
    this.currencyService.add(currency).subscribe(() => {
      this.bindQueryParamsService.updateResolver();
      this.toastr.success(`Валюта "${currency.name}" добавлена успешно`);
      this.closeModal();
    });
  }
}
