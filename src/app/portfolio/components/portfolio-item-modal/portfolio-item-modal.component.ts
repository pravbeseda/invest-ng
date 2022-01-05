import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {StockItem} from '@models/stocks';
import {Observable, Subject} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-portfolio-item-modal',
  templateUrl: './portfolio-item-modal.component.html',
  styleUrls: ['./portfolio-item-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioItemModalComponent implements OnInit {
  // Input
  stockItems$!: Observable<StockItem[]>;

  stockCtrl = new FormControl();

  readonly formDeal = this.fb.group({
    dealDate: null,
    quantity: null,
    cost: null,
    costRubles: null,
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.stockCtrl?.valueChanges.pipe(untilDestroyed(this)).subscribe(id => this.loadStockInfo(id));
  }

  loadStockInfo(id: string) {
    // Todo: загрузка бумаги портфеля по тикеру


  }

}
