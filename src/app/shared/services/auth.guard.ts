import { Injectable } from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  canActivate(): boolean | UrlTree {
    if (this.authenticationService.isLogged()) {
      return true;
    } else {
      return this.router.createUrlTree(['/user/login']);
    }
  }
}
