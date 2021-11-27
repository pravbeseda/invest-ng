import { NgModule } from '@angular/core';
import { LoginFormPage } from './pages/login-form/login-form.page';
import {UserLoginRoutingModule} from './user-login-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {UserLoginService} from './services/user-login.service';

@NgModule({
  declarations: [
    LoginFormPage
  ],
  imports: [
    SharedModule,
    UserLoginRoutingModule
  ],
  providers: [ UserLoginService ]
})
export class UserLoginModule { }
