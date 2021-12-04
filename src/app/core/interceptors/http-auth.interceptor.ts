import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from '../../shared/services/authentication.service';

@Injectable()
export class HttpAuthInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationService.getToken();
    const isApiSecuredUrl = request.url.startsWith('/api') && !request.url.startsWith('/api/common');
    if (!!token && isApiSecuredUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request);
  }

}
