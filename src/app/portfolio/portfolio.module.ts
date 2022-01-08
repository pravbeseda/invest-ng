import { NgModule } from '@angular/core';
import { PortfolioListPage } from './pages/portfolio-list/portfolio-list.page';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import {PortfolioModalComponent} from './components/portfolio-modal/portfolio-modal.component';
import {SharedModule} from '@shared/shared.module';
import {PortfolioService} from './services/portfolio.service';
import { PortfolioListItemComponent } from './components/portfolio-list-item/portfolio-list-item.component';
import { PortfolioItemPage } from './pages/portfolio-item/portfolio-item.page';
import { PortfolioDealModalComponent } from './components/portfolio-deal-modal/portfolio-deal-modal.component';
import {CurrencyService} from '../currencies/services/currency.service';

@NgModule({
  declarations: [
    PortfolioListPage,
    PortfolioModalComponent,
    PortfolioListItemComponent,
    PortfolioItemPage,
    PortfolioDealModalComponent
  ],
  imports: [
    SharedModule,
    PortfolioRoutingModule
  ],
  providers: [ PortfolioService, CurrencyService ]
})
export class PortfolioModule { }
