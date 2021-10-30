import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { StocksService } from '../../services/stocks.service';
import {Intent} from "@models/common";
import {ToastrService} from "ngx-toastr";
import {StockItem} from "@models/stocks";
import {Subject} from "rxjs";
import {SearchStockInDto} from '../../models/SearchStockInDto';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './stocks-list.page.html',
  styleUrls: ['./stocks-list.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksListPage implements OnInit {
  readonly stocks$ = new Subject<StockItem[]>();
  openedModal = false;
  readonly trackById = (_: number, { id }: StockItem) => id;

  constructor(private stocksService: StocksService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getStocks();
  }

  private getStocks(): void {
    this.stocksService.getStocks().subscribe(result => this.stocks$.next(result.content));
  }

  openStockModal() {
    this.openedModal = true;
  }

  closeModal() {
    this.openedModal = false;
  }

  loadStock(intent: Intent<SearchStockInDto>) {
    this.stocksService.searchStock(intent.ticker, intent.driver).subscribe(r => {
      if (!!r) {
        intent.onSuccess(r);
      } else {
        this.toastr.error('Ничего не найдено');
      }
    });
  }

  saveStock(stock: StockItem) {
    this.stocksService.addStock(stock).subscribe(() => {
      this.toastr.success('Бумага добавлена успешно');
      this.getStocks();
      this.closeModal();
    });
  }

}
