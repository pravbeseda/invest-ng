import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {StockItem} from '@models/stocks';

@Component({
  selector: 'app-stock-list-item',
  templateUrl: './stock-list-item.component.html',
  styleUrls: ['./stock-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockListItemComponent implements OnInit {

  @Input()
  stock: StockItem | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
