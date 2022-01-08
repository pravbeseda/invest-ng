import { Component, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {catchError, filter, map, pluck, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {StockItem, Intent} from '@models';
import {SearchCurrencyInDto} from '../../models/SearchCurrencyInDto';
import {CurrencyService} from '../../services/currency.service';
import {ToastrService} from 'ngx-toastr';
import {BindQueryParamsService} from '@shared/services/bind-query-params.service';
import {ModalService} from '@shared/modules/modal/services/modal.service';
import {CurrencyModalComponent} from '../../components/currency-modal/currency-modal.component';
import {untilDestroyed} from '@ngneat/until-destroy';

@Component({
  selector: 'app-currencies-list',
  templateUrl: './currencies-list.page.html',
  styleUrls: ['./currencies-list.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrenciesListPage {
  readonly currencies$: Observable<StockItem[]> = this.route.data.pipe(pluck('currencies'), map(v => v.content));
  readonly trackById = (_: number, { id }: StockItem) => id;

  constructor(
    private route: ActivatedRoute,
    private currencyService: CurrencyService,
    private bindQueryParamsService: BindQueryParamsService,
    private toastr: ToastrService,
    private modal: ModalService,
  ) { }

  openModal() {
    const modalRef = this.modal.open(CurrencyModalComponent);
    const componentInstance: CurrencyModalComponent = modalRef.componentInstance;
    componentInstance.loadCurrency$.pipe(untilDestroyed(componentInstance)).subscribe(intent => this.loadCurrency(intent));
    componentInstance.saveCurrency$
      .pipe(
        switchMap(currency => this.currencyService.add(currency).pipe(catchError(() => of(null)))),
        filter(r => r !== null),
        untilDestroyed(componentInstance)
      )
      .subscribe(() => {
        modalRef.close();
        this.bindQueryParamsService.updateResolver();
        this.toastr.success(`Валюта добавлена успешно`);
      });
    componentInstance.close$.pipe(untilDestroyed(componentInstance)).subscribe(() => modalRef.close());
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
}
