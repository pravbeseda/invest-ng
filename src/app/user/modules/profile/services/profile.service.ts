import { Injectable } from '@angular/core';
import {CurrentUser} from '@models';
import {Observable} from 'rxjs';
import {ApiUserService} from '@api';

@Injectable()
export class ProfileService {

  constructor(private apiUserService: ApiUserService) { }

  updateUser(body: CurrentUser): Observable<void> {
    return this.apiUserService.updateUser(body);
  }
}
