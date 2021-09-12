import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StocksService } from '../../services/stocks.service';
import {IntentData} from "../../../../models/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './stocks-list.page.html',
  styleUrls: ['./stocks-list.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksListPage implements OnInit {
  openedModal = false;

  constructor(private stocksService: StocksService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  openStockModal() {
    this.openedModal = true;
  }

  closeModal() {
    this.openedModal = false;
  }

  loadStock(intent: IntentData<string>) {
    this.stocksService.getStock(intent.data).subscribe(r => {
      intent.onSuccess(r)
      this.toastr.success('Done!');
    });
  }

}
