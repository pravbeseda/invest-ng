import { NgModule } from '@angular/core';
import { LoginFormPage } from './pages/login-form/login-form.page';
import {UserLoginRoutingModule} from './user-login-routing.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [
    LoginFormPage
  ],
  imports: [
    SharedModule,
    UserLoginRoutingModule
  ],
})
export class UserLoginModule { }
