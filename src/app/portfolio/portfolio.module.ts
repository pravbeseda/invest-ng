import { NgModule } from '@angular/core';
import { PortfolioListPage } from './pages/portfolio-list/portfolio-list.page';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import {PortfolioModalComponent} from './components/portfolio-modal/portfolio-modal.component';
import {SharedModule} from '@shared/shared.module';
import {PortfolioService} from './services/portfolio.service';

@NgModule({
  declarations: [
    PortfolioListPage,
    PortfolioModalComponent
  ],
  imports: [
    SharedModule,
    PortfolioRoutingModule
  ],
  providers: [ PortfolioService ]
})
export class PortfolioModule { }
