import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import {StockItem} from '@models/stocks';
import {ToastrService} from 'ngx-toastr';
import {CurrencyService} from '../../services/currency.service';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './currency-item.page.html',
  styleUrls: ['./currency-item.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyItemPage implements OnInit {
  readonly currencyId = Number(this.route.snapshot.paramMap.get('currencyId'));
  readonly currency$ = new BehaviorSubject<StockItem | null>(null);

  constructor(private router: Router, private route: ActivatedRoute, private currencyService: CurrencyService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadStock(this.currencyId);
  }

  save(stock: StockItem) {
    this.currencyService.update(this.currencyId, stock).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
      this.toastr.success('Изменения сохранены');
    });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  priceUpdate() {
    this.currencyService.refreshPrice(this.currencyId).toPromise()
      .then((price) => {
        this.toastr.success(`Последняя цена ${price}`);
        const stock = {
          ...this.currency$.value,
          lastPrice: price
        } as StockItem;
        this.currency$.next(stock);
      });
  }

  private loadStock(id: number) {
    this.currencyService.getCurrency(id).subscribe((currency) => this.currency$.next(currency));
  }
}
