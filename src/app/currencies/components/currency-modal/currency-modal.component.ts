import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Intent} from '@models/common';
import {Subject} from "rxjs";
import {StockItem} from "@models/stocks";
import {currencyDrivers} from '../../consts/currencies-consts';
import {SearchCurrencyInDto} from '../../models/SearchCurrencyInDto';

const defaultDriver = 'TCS';

@Component({
  selector: 'app-currency-modal',
  templateUrl: './currency-modal.component.html',
  styleUrls: ['./currency-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyModalComponent implements OnInit {
  @Input()
  set opened(opened: boolean) {
    // При закрытии модалки очищаем форму
    if (!opened) {
      this.form.reset({ driver: defaultDriver });
      this.currency$.next(null);
    }
  }

  @Output()
  readonly loadCurrency = new EventEmitter<Intent<SearchCurrencyInDto>>();

  @Output()
  readonly saveCurrency = new EventEmitter<StockItem>();

  @Output()
  readonly close = new EventEmitter<void>();

  readonly currency$ = new Subject<StockItem | null>();
  readonly currencyDrivers = currencyDrivers;

  readonly form = this.fb.group({
    name: [null, Validators.required],
    driver: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.patchValue({
      driver: defaultDriver
    });
  }

  search() {
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;
    const intent: Intent<SearchCurrencyInDto> = {
      name: data.name,
      driver: data.driver,
      onSuccess: r => {
        this.currency$.next(r);
      }
    }
    this.loadCurrency.emit(intent);
  }

  save(stock: StockItem) {
    this.saveCurrency.emit(stock);
  }

}
