import { NgModule } from '@angular/core';
import { PortfolioListPage } from './pages/portfolio-list/portfolio-list.page';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import {PortfolioModalComponent} from './components/portfolio-modal/portfolio-modal.component';
import {SharedModule} from '@shared/shared.module';
import {PortfolioService} from './services/portfolio.service';
import { PortfolioListItemComponent } from './components/portfolio-list-item/portfolio-list-item.component';
import { PortfolioItemPage } from './pages/portfolio-item/portfolio-item.page';

@NgModule({
  declarations: [
    PortfolioListPage,
    PortfolioModalComponent,
    PortfolioListItemComponent,
    PortfolioItemPage
  ],
  imports: [
    SharedModule,
    PortfolioRoutingModule
  ],
  providers: [ PortfolioService ]
})
export class PortfolioModule { }
