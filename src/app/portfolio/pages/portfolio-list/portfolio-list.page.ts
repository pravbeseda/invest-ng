import { Component, ChangeDetectionStrategy } from '@angular/core';
import {PortfolioService} from '../../services/portfolio.service';
import {ModalService} from '@shared/modules/modal/services/modal.service';
import {PortfolioModalComponent} from '../../components/portfolio-modal/portfolio-modal.component';
import {untilDestroyed} from '@ngneat/until-destroy';
import {catchError, filter, map, pluck, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Portfolio} from '@models/portfolio';
import {ActivatedRoute} from '@angular/router';
import {BindQueryParamsService} from '@shared/services/bind-query-params.service';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.page.html',
  styleUrls: ['./portfolio-list.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioListPage {
  readonly portfolios$: Observable<Portfolio[]> = this.route.data.pipe(pluck('portfolios'), map(v => v.content));
  readonly trackById = (_: number, { id }: Portfolio) => id;

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private modal: ModalService,
    private bindQueryParamsService: BindQueryParamsService
  ) { }

  openModal() {
    const modalRef = this.modal.open(PortfolioModalComponent);
    const componentInstance: PortfolioModalComponent = modalRef.componentInstance;
    componentInstance.save$.pipe(
      switchMap(portfolio => this.portfolioService.addPortfolio(portfolio).pipe(catchError(err => of(null)))),
      filter(res => res !== null),
      untilDestroyed(componentInstance)
    ).subscribe(res => {
      this.bindQueryParamsService.updateResolver();
      modalRef.close();
    });
  }
}
