import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {PortfolioServiceService} from '../../services/portfolio-service.service';
import {BehaviorSubject} from 'rxjs';
import {ModalService} from '../../../shared/modules/modal/services/modal.service';
import {PortfolioModalComponent} from '../../components/portfolio-modal/portfolio-modal.component';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.page.html',
  styleUrls: ['./portfolio-list.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioListPage implements OnInit {
  readonly isOpenedModal$ = new BehaviorSubject(false);

  constructor(private portfolioServiceService: PortfolioServiceService, private modal: ModalService) { }

  ngOnInit(): void {
  }

  savePortfolio(name: string) {
    this.portfolioServiceService.addPortfolio(name).subscribe(() => {
      this.closeModal();
    });
  }

  openModal() {
    this.modal.open(PortfolioModalComponent);
  }

  closeModal() {
    this.isOpenedModal$.next(false);
  }

}
