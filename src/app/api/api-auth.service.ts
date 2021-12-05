import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {LoginInDto} from '@models/login-in-dto';
import {LoginOutDto} from '@models/login-out-dto';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  constructor(private http: HttpClient) { }

  login(body: LoginInDto): Observable<LoginOutDto> {
    const url = `/api/common/login`;
    return this.http.post<LoginOutDto>(url, body);
  }
}
