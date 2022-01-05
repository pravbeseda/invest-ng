import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs';
import {Portfolio} from '@models/portfolio';
import {pluck} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ModalService} from '@shared/modules/modal/services/modal.service';
import {PortfolioItemModalComponent} from '../../components/portfolio-item-modal/portfolio-item-modal.component';
import {PortfolioService} from '../../services/portfolio.service';
import {PortfolioModalComponent} from '../../components/portfolio-modal/portfolio-modal.component';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.page.html',
  styleUrls: ['./portfolio-item.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioItemPage implements OnInit {
  readonly portfolio$: Observable<Portfolio> = this.route.data.pipe(pluck('portfolio'));

  constructor(private route: ActivatedRoute, private modal: ModalService, private portfolioService: PortfolioService) { }

  ngOnInit(): void {
  }

  openItemModal() {
    const modalRef = this.modal.open(PortfolioItemModalComponent);
    const componentInstance: PortfolioItemModalComponent = modalRef.componentInstance;
    componentInstance.stockItems$ = this.portfolioService.getPortfolioStocks();
  }

  openPortfolioModal(portfolio: Portfolio) {
    const modalRef = this.modal.open(PortfolioModalComponent);
    const componentInstance: PortfolioModalComponent = modalRef.componentInstance;
  }
}
