import { Injectable } from '@angular/core';
import {ApiAuthService} from '@api';
import {LoginInDto} from '@models/login-in-dto';
import {BehaviorSubject, Observable} from 'rxjs';
import {CurrentUser} from '@models/current-user';
import {filter, switchMapTo, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$ = new BehaviorSubject<CurrentUser | null>(null);

  constructor(private apiUserService: ApiAuthService) { }

  login(body: LoginInDto): Observable<CurrentUser> {
    return this.apiUserService.login(body).pipe(
      filter(answer => answer.status === 'success'),
      tap(answer => localStorage.setItem('token', answer.token)),
      switchMapTo(this.updateCurrentUser())
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUser$.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  updateCurrentUser(): Observable<CurrentUser> {
    return this.apiUserService.getCurrentUser().pipe(
      tap(user => this.currentUser$.next(user))
    );
  }

}
