import { Component, ChangeDetectionStrategy } from '@angular/core';
import {PortfolioService} from '../../services/portfolio.service';
import {ModalService} from '@shared/modules/modal/services/modal.service';
import {PortfolioModalComponent} from '../../components/portfolio-modal/portfolio-modal.component';
import {untilDestroyed} from '@ngneat/until-destroy';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.page.html',
  styleUrls: ['./portfolio-list.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioListPage {
  constructor(private portfolioServiceService: PortfolioService, private modal: ModalService) { }

  openModal() {
    const modalRef = this.modal.open(PortfolioModalComponent);
    const componentInstance: PortfolioModalComponent = modalRef.componentInstance;
    componentInstance.save$.pipe(
      switchMap(name => this.portfolioServiceService.addPortfolio(name).pipe(catchError(err => of(null)))),
      untilDestroyed(componentInstance)
    ).subscribe(res => res !== null && modalRef.close());
  }
}
