import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, pluck} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Intent} from '@models/common';
import {StockItem} from '@models/stocks';
import {SearchCurrencyInDto} from '../../models/SearchCurrencyInDto';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  openModal() {
    this.isOpenedModal = true;
  }

  closeModal() {
    this.isOpenedModal = false;
  }

  loadCurrency(intent: Intent<SearchCurrencyInDto>) {
    /*this.stocksService.searchStock(intent.ticker, intent.driver).subscribe(r => {
      if (!!r) {
        intent.onSuccess(r);
      } else {
        this.toastr.error('Ничего не найдено');
      }
    });*/
  }

  saveCurrency(stock: StockItem) {
    /*this.stocksService.addStock(stock).subscribe(() => {
      this.toastr.success('Бумага добавлена успешно');
      this.getStocks();
      this.closeModal();
    });*/
  }
}
