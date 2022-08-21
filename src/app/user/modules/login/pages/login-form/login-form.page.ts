import { Component, ChangeDetectionStrategy } from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../../shared/services/authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormPage {

  readonly form = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private fb: UntypedFormBuilder, private userLoginService: AuthenticationService, private router: Router) { }

  login() {
    this.userLoginService.login(this.form.value).subscribe(() => {
      const { redirect } = window.history.state;
      this.router.navigateByUrl(redirect || '/');
    });
  }

}
