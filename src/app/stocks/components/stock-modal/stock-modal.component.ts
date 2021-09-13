import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
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
export class StockModalComponent implements OnInit {
  @Output()
  readonly loadStock = new EventEmitter<IntentData<string>>();

  readonly ticker = new FormControl(null, Validators.required);

  readonly searchResult$ = new Subject<StockItem>()

  constructor() { }

  ngOnInit(): void {
  }

  search() {
    if (this.ticker.invalid) {
      return
    }
    const intent: IntentData<string> = {
      data: this.ticker.value?.toUpperCase(),
      onSuccess: r => {
        console.log({ r });
        this.searchResult$.next(r);
      }
    }
    this.loadStock.emit(intent);
  }

}
