import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StocksService} from '../../services/stocks.service';
import {Subject} from 'rxjs';
import {StockItem} from '@models/stocks';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockItemComponent implements OnInit {
  readonly stockId = this.route.snapshot.paramMap.get('stockId');
  readonly stock$: Subject<StockItem> = new Subject();

  constructor(private router: Router, private route: ActivatedRoute, private stocksService: StocksService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.stocksService.getStock(Number(this.stockId)).subscribe((stock) => this.stock$.next(stock));
  }

  save(stock: StockItem) {
    this.stocksService.updateStock(stock.id, stock).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
      this.toastr.success('Изменения сохранены');
    });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
