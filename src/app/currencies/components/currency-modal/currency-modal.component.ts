import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {StockItem, Intent} from '@models';
import {Subject} from "rxjs";
import {currencyDrivers} from '../../consts/currencies-consts';
import {SearchCurrencyInDto} from '../../models/SearchCurrencyInDto';
import {UntilDestroy} from '@ngneat/until-destroy';

const defaultDriver = 'TCS';

@UntilDestroy()
@Component({
  selector: 'app-currency-modal',
  templateUrl: './currency-modal.component.html',
  styleUrls: ['./currency-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyModalComponent implements OnInit {
  // Output
  readonly loadCurrency$ = new Subject<Intent<SearchCurrencyInDto>>();

  // Output
  readonly saveCurrency$ = new Subject<StockItem>();

  // Output
  readonly close$ = new Subject<void>();

  readonly currency$ = new Subject<StockItem | null>();
  readonly currencyDrivers = currencyDrivers;

  readonly form = this.fb.group({
    name: [null, Validators.required],
    driver: [null, Validators.required]
  });

  constructor(private fb: UntypedFormBuilder) {}

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
    this.loadCurrency$.next(intent);
  }
}
