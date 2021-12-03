import { Injectable } from '@angular/core';
import {ApiUserService} from '@api';
import {LoginInDto} from '@models/login-in-dto';
import {Observable} from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class UserLoginService {

  constructor(private apiUserService: ApiUserService) { }

  login(body: LoginInDto): Observable<void> {
    return this.apiUserService.login(body).pipe(shareReplay());
  }
}