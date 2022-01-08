import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Intent, StockItem} from '@models';
import {Subject} from "rxjs";
import {stockDrivers} from '../../consts/stocks-consts';
import {SearchStockInDto} from '../../models/SearchStockInDto';
import {UntilDestroy} from '@ngneat/until-destroy';

const defaultDriver = 'TCS';

@UntilDestroy()
@Component({
  selector: 'app-stock-modal',
  templateUrl: './stock-modal.component.html',
  styleUrls: ['./stock-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockModalComponent implements OnInit {
  // Output
  readonly loadStock$ = new Subject<Intent<SearchStockInDto>>();
  // Output
  readonly saveStock$ = new Subject<StockItem>();
  // Output
  readonly cancel$ = new Subject<void>();

  readonly stock$ = new Subject<StockItem>();
  readonly stockDrivers = stockDrivers;

  readonly form = this.fb.group({
    ticker: [null, Validators.required],
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
    const intent: Intent<SearchStockInDto> = {
      ticker: data.ticker?.toUpperCase(),
      driver: data.driver,
      onSuccess: r => {
        this.stock$.next(r);
      }
    }
    this.loadStock$.next(intent);
  }
}
