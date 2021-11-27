import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserLoginService} from '../../services/user-login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormPage implements OnInit {

  readonly form = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private userLoginService: UserLoginService) { }

  ngOnInit(): void {
  }

  login() {
    this.userLoginService.login(this.form.value).subscribe();
  }

}
