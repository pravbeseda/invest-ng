import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import {Deal, StockItem} from '@models';
import {Observable, Subject} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-portfolio-deal-modal',
  templateUrl: './portfolio-deal-modal.component.html',
  styleUrls: ['./portfolio-deal-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioDealModalComponent implements OnInit {
  // Input
  stockItems$!: Observable<StockItem[]>;
  // Input
  currencies$!: Observable<StockItem[]>;

  // Output
  readonly deal$ = new Subject<Partial<Deal>>();

  currencies!: StockItem[];

  readonly stockCtrl = new UntypedFormControl();
  readonly form = this.fb.group({
    datetime: null,
    quantity: null,
    cost: null,
    costRub: null,
  });

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.currencies$.pipe(untilDestroyed(this)).subscribe(currencies => this.currencies = currencies);
    this.stockCtrl?.valueChanges.pipe(untilDestroyed(this)).subscribe(id => this.loadStockInfo(id));
    // При изменении количества автоматически меняем стоимость
    this.form.get('quantity')?.valueChanges.pipe(untilDestroyed(this)).subscribe( quantity => this.costCorrectByQuantity(quantity));
  }

  costCorrectByQuantity(quantity: number) {
    const stock = this.stockCtrl.value as StockItem;
    const cost = quantity * stock.lastPrice;
    const costRub = (stock.currency === 'RUB')
      ? null
      : cost * (this.currencies.find(({ticker}) => ticker === stock.currency)?.lastPrice || 0);
    this.form.patchValue({ cost, costRub });
  }

  makeDeal() {
    const stockId = this.stockCtrl.value.id;
    this.deal$.next({ ...this.form.value, stockId })
  }

  loadStockInfo(id: string) {
    // Todo: загрузка бумаги портфеля
    const { datetime } = this.form.value;
    this.form.reset({ datetime });
  }

}
