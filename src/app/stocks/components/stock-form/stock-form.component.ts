import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import { StockItem } from '@models/stocks';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockFormComponent {
  @Input()
  set stock(stock: StockItem) {
    if (stock) {
      this.form.patchValue(stock);
    } else {
      this.form.reset();
    }
  }

  @Output()
  readonly onSave = new EventEmitter<StockItem>();

  readonly form = this.fb.group({
    id: null,
    ticker: null,
    name: null,
    currency: null,
    figi: null,
    isin: null,
    type: null,
    lastPrice: null
  });

  constructor(private fb: FormBuilder) { }

  save() {
    this.onSave.emit(this.form.value);
  }
}
