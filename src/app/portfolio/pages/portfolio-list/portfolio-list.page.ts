import { Component, ChangeDetectionStrategy } from '@angular/core';
import {PortfolioServiceService} from '../../services/portfolio-service.service';
import {ModalService} from '../../../shared/modules/modal/services/modal.service';
import {PortfolioModalComponent} from '../../components/portfolio-modal/portfolio-modal.component';
import {untilDestroyed} from '@ngneat/until-destroy';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.page.html',
  styleUrls: ['./portfolio-list.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioListPage {
  constructor(private portfolioServiceService: PortfolioServiceService, private modal: ModalService) { }

  openModal() {
    const modalRef = this.modal.open(PortfolioModalComponent);
    const componentInstance: PortfolioModalComponent = modalRef.componentInstance;
    componentInstance.save.pipe(
      switchMap(name => this.portfolioServiceService.addPortfolio(name)),
      untilDestroyed(componentInstance)
    ).subscribe(() => modalRef.close());
  }
}
