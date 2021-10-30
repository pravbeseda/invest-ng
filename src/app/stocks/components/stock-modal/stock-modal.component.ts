import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Intent} from '@models/common';
import {Subject} from "rxjs";
import {StockItem} from "@models/stocks";
import {stockDrivers} from '../../consts/stocks-consts';
import {SearchStockInDto} from '../../models/SearchStockInDto';

const defaultDriver = 'MCX';

@Component({
  selector: 'app-stock-modal',
  templateUrl: './stock-modal.component.html',
  styleUrls: ['./stock-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockModalComponent implements OnInit {
  @Input()
  set opened(opened: boolean) {
    // При закрытии модалки очищаем форму
    if (!opened) {
      this.form.reset({ driver: defaultDriver });
      this.stock$.next(null);
    }
  }

  @Output()
  readonly loadStock = new EventEmitter<Intent<SearchStockInDto>>();

  @Output()
  readonly saveStock = new EventEmitter<StockItem>();

  @Output()
  readonly close = new EventEmitter<void>();

  readonly stock$ = new Subject<StockItem | null>();
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
    this.loadStock.emit(intent);
  }

  save(stock: StockItem) {
    this.saveStock.emit(stock);
  }

}
