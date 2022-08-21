import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import { StockItem } from '@models';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyFormComponent {
  @Input()
  set currency(stock: StockItem) {
    if (stock) {
      this.form.patchValue(stock);
    } else {
      this.form.reset();
    }
  }

  @Output()
  readonly save = new EventEmitter<StockItem>();

  @Output()
  readonly cancel = new EventEmitter<void>();

  readonly form = this.fb.group({
    id: null,
    ticker: null,
    name: null,
    currency: null,
    figi: null,
    isin: null,
    type: null,
    lastPrice: null,
    driver: null,
    boardId: null,
  });

  constructor(private fb: UntypedFormBuilder) { }
}
