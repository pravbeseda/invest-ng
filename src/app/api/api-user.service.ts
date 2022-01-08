import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {CurrentUser} from '@models';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<CurrentUser> {
    const url = `/api/user`;
    return this.http.get<CurrentUser>(url);
  }

  updateUser(body: CurrentUser): Observable<void> {
    const url = `/api/user`;
    return this.http.put<void>(url, body);
  }

}
