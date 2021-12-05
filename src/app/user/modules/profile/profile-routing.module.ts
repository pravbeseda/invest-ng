import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileFormPage} from './pages/profile-form/profile-form.page';
import {AuthGuard} from '../../../shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfileFormPage,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
