import { NgModule } from '@angular/core';
import { CurrenciesListPage } from './pages/currencies-list/currencies-list.page';
import {CurrenciesRoutingModule} from './currencies-routing.module';
import {CurrenciesService} from './services/currencies.service';
import {CurrencyModalComponent} from './components/currency-modal/currency-modal.component';
import {CurrencyFormComponent} from './components/currency-form/currency-form.component';
import {CurrencyListItemComponent} from './components/currency-list-item/currency-list-item.component';
import {SharedModule} from '../shared/shared.module';
import {CurrenciesResolver} from './resolvers/currencies.resolver';

@NgModule({
  declarations: [
    CurrenciesListPage,
    CurrencyModalComponent,
    CurrencyFormComponent,
    CurrencyListItemComponent
  ],
  imports: [
    CurrenciesRoutingModule,
    SharedModule,
  ],
  providers: [CurrenciesService, CurrenciesResolver]
})
export class CurrenciesModule { }
