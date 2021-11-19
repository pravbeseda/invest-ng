import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {StockItem} from '@models/stocks';

@Component({
  selector: 'app-currency-list-item',
  templateUrl: './currency-list-item.component.html',
  styleUrls: ['./currency-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyListItemComponent implements OnInit {

  @Input()
  currency: StockItem | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
