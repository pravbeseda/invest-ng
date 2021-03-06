import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {LoginInDto, LoginOutDto} from '@models';

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
