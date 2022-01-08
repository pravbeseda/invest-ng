import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Portfolio} from '@models';
import {catchError, filter, map, pluck, shareReplay, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ModalService} from '@shared/modules/modal/services/modal.service';
import {PortfolioDealModalComponent} from '../../components/portfolio-deal-modal/portfolio-deal-modal.component';
import {PortfolioService} from '../../services/portfolio.service';
import {PortfolioModalComponent} from '../../components/portfolio-modal/portfolio-modal.component';
import {untilDestroyed} from '@ngneat/until-destroy';
import {BindQueryParamsService} from '@shared/services/bind-query-params.service';
import {ToastrService} from 'ngx-toastr';
import {CurrencyService} from '../../../currencies/services/currency.service';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.page.html',
  styleUrls: ['./portfolio-item.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioItemPage implements OnInit {
  readonly portfolio$: Observable<Portfolio> = this.route.data.pipe(pluck('portfolio'));
  readonly currencies$ = this.currencyService.getCurrencies().pipe(map(({content}) => content), shareReplay());
  readonly portfolioId = this.route.snapshot.params.portfolioId;

  constructor(
    private route: ActivatedRoute,
    private modal: ModalService,
    private portfolioService: PortfolioService,
    private currencyService: CurrencyService,
    private bindQueryParamsService: BindQueryParamsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  openDealModal() {
    const modalRef = this.modal.open(PortfolioDealModalComponent);
    const componentInstance: PortfolioDealModalComponent = modalRef.componentInstance;
    componentInstance.stockItems$ = this.portfolioService.getPortfolioStocks();
    componentInstance.currencies$ = this.currencies$;
    componentInstance.deal$.pipe(
      switchMap(data => this.portfolioService.createDeal({ ...data, portfolioId: this.portfolioId }).pipe(catchError(() => of(null)))),
      untilDestroyed(componentInstance)
    ).subscribe(res => {
      if (res !== null) {
        componentInstance.form.reset();
        this.toastr.success(`Сделка добавлена успешно`);
      }
    });
  }

  openPortfolioModal(portfolio: Portfolio) {
    const modalRef = this.modal.open(PortfolioModalComponent);
    const componentInstance: PortfolioModalComponent = modalRef.componentInstance;
    componentInstance.portfolio = portfolio;
    componentInstance.save$.pipe(
      switchMap(portfolio => this.portfolioService.updatePortfolio(portfolio).pipe(catchError(err => of(null)))),
      filter(res => res !== null),
      untilDestroyed(componentInstance)
    ).subscribe(res => {
      this.bindQueryParamsService.updateResolver();
      modalRef.close();
    });
  }
}
