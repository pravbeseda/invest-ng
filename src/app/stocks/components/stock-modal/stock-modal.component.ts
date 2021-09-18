import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {IntentData} from '@models/common';
import {Subject} from "rxjs";
import {StockItem} from "@models/stocks";

@Component({
  selector: 'app-stock-modal',
  templateUrl: './stock-modal.component.html',
  styleUrls: ['./stock-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockModalComponent {
  @Input()
  set opened(opened: boolean) {
    // При закрытии модалки очищаем форму
    if (!opened) {
      this.ticker.reset();
      this.stock$.next(null);
    }
  }

  @Output()
  readonly loadStock = new EventEmitter<IntentData<string>>();

  @Output()
  readonly saveStock = new EventEmitter<StockItem>();

  readonly ticker = new FormControl(null, Validators.required);
  readonly stock$ = new Subject<StockItem | null>();

  search() {
    if (this.ticker.invalid) {
      return;
    }
    const intent: IntentData<string> = {
      data: this.ticker.value?.toUpperCase(),
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
