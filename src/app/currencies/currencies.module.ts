import { NgModule } from '@angular/core';
import { CurrenciesListPage } from './pages/currencies-list/currencies-list.page';
import {CurrenciesRoutingModule} from './currencies-routing.module';
import {CurrencyService} from './services/currency.service';
import {CurrencyModalComponent} from './components/currency-modal/currency-modal.component';
import {CurrencyFormComponent} from './components/currency-form/currency-form.component';
import {CurrencyListItemComponent} from './components/currency-list-item/currency-list-item.component';
import {SharedModule} from '../shared/shared.module';
import {CurrencyItemPage} from './pages/currency-edit/currency-item.page';

@NgModule({
  declarations: [
    CurrenciesListPage,
    CurrencyItemPage,
    CurrencyModalComponent,
    CurrencyFormComponent,
    CurrencyListItemComponent,
  ],
  imports: [
    CurrenciesRoutingModule,
    SharedModule,
  ],
  providers: [CurrencyService]
})
export class CurrenciesModule { }
