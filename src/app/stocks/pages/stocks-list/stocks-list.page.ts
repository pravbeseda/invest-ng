import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StocksService } from '../../services/stocks.service';
import {IntentData} from "@models/common";
import {ToastrService} from "ngx-toastr";
import {StockItem} from "@models/stocks";

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './stocks-list.page.html',
  styleUrls: ['./stocks-list.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksListPage {
  openedModal = false;

  constructor(private stocksService: StocksService, private toastr: ToastrService) { }

  openStockModal() {
    this.openedModal = true;
  }

  closeModal() {
    this.openedModal = false;
  }

  loadStock(intent: IntentData<string>) {
    this.stocksService.getStock(intent.data).subscribe(r => {
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
    });
  }

}
