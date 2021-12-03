import { Injectable } from '@angular/core';
import {ApiUserService} from '@api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apiUserService: ApiUserService) { }


}
