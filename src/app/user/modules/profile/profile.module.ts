import { NgModule } from '@angular/core';
import { ProfileFormPage } from './pages/profile-form/profile-form.page';
import {ProfileRoutingModule} from './profile-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ProfileService} from './services/profile.service';

@NgModule({
  declarations: [
    ProfileFormPage,
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  providers: [ProfileService]
})
export class ProfileModule { }
