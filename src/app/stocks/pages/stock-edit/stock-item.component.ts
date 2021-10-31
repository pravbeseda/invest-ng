import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StocksService} from '../../services/stocks.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {StockItem} from '@models/stocks';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockItemComponent implements OnInit {
  readonly stockId = Number(this.route.snapshot.paramMap.get('stockId'));
  readonly stock$ = new BehaviorSubject<StockItem | null>(null);

  constructor(private router: Router, private route: ActivatedRoute, private stocksService: StocksService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadStock(this.stockId);
  }

  save(stock: StockItem) {
    this.stocksService.updateStock(this.stockId, stock).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
      this.toastr.success('Изменения сохранены');
    });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  priceUpdate() {
    this.stocksService.refreshPrice(this.stockId).toPromise()
      .then((price) => {
        this.toastr.success(`Последняя цена ${price}`);
        const stock = {
          ...this.stock$.value,
          lastPrice: price
        } as StockItem;
        this.stock$.next(stock);
      });
  }

  private loadStock(id: number) {
    this.stocksService.getStock(id).subscribe((stock) => this.stock$.next(stock));
  }
}
