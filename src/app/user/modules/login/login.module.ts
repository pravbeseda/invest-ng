import { NgModule } from '@angular/core';
import { LoginFormPage } from './pages/login-form/login-form.page';
import {LoginRoutingModule} from './login-routing.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [
    LoginFormPage
  ],
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
})
export class LoginModule { }
