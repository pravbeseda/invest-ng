import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { StocksService } from '../../services/stocks.service';
import {Intent, StockItem} from '@models';
import {ToastrService} from "ngx-toastr";
import {of, Subject} from "rxjs";
import {SearchStockInDto} from '../../models/SearchStockInDto';
import {ModalService} from '@shared/modules/modal/services/modal.service';
import {StockModalComponent} from '../../components/stock-modal/stock-modal.component';
import {untilDestroyed} from '@ngneat/until-destroy';
import {catchError, filter, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './stocks-list.page.html',
  styleUrls: ['./stocks-list.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksListPage implements OnInit {
  readonly stocks$ = new Subject<StockItem[]>();
  readonly trackById = (_: number, { id }: StockItem) => id;

  constructor(private stocksService: StocksService, private toastr: ToastrService, private modal: ModalService) { }

  ngOnInit(): void {
    this.getStocks();
  }

  private getStocks(): void {
    this.stocksService.getStocks().subscribe(result => this.stocks$.next(result.content));
  }

  openStockModal() {
    const modalRef = this.modal.open(StockModalComponent);
    const componentInstance: StockModalComponent = modalRef.componentInstance;
    componentInstance.loadStock$
      .pipe(untilDestroyed(componentInstance))
      .subscribe(intent => this.loadStock(intent));
    componentInstance.saveStock$
      .pipe(
        switchMap(stock => this.stocksService.addStock(stock).pipe(catchError(err => of(null)))),
        filter(res => res != null),
        untilDestroyed(componentInstance)
      )
      .subscribe(() => {
        this.toastr.success('Бумага добавлена успешно');
        this.getStocks();
      });
    componentInstance.cancel$.pipe(untilDestroyed(componentInstance)).subscribe(() => modalRef.close())
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

}
