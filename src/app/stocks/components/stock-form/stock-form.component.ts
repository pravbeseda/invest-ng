import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { StockItem } from '@models/stocks';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockFormComponent implements OnInit {
  @Input()
  set stock(stock: StockItem) {
    if (stock) {
      this.form.patchValue(stock);
    } else {
      this.form.reset();
    }
  }

  readonly form = this.fb.group({
    ticker: null,
    name: null,
    currency: null,
    figi: null,
    isin: null,
    type: null,
    lastPrice: null
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
