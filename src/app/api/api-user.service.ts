import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {LoginInDto} from '@models/login-in-dto';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private http: HttpClient) { }

  login(body: LoginInDto): Observable<void> {
    const url = `/api/login`;
    return this.http.post<void>(url, body);
  }
}
