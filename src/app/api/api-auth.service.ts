import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {LoginInDto} from '@models/login-in-dto';
import {LoginOutDto} from '@models/login-out-dto';
import {CurrentUser} from '@models/current-user';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  constructor(private http: HttpClient) { }

  login(body: LoginInDto): Observable<LoginOutDto> {
    const url = `/api/common/login`;
    return this.http.post<LoginOutDto>(url, body);
  }

  getCurrentUser(): Observable<CurrentUser> {
    const url = `/api/current-user`;
    return this.http.get<CurrentUser>(url);
  }
}
