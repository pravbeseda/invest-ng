import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import { isObject } from 'lodash';
import {distinctUntilChanged, tap} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class HttpErrorsInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const emitNotify = isObject(request.body) ? (request.body as any).emitNotify : undefined;
    return next.handle(request).pipe(
      distinctUntilChanged(),
      tap(null, (err: HttpErrorResponse) => this.handle(err, emitNotify !== false))
    );
  }

  private handle({ status, error = {}, message }: HttpErrorResponse, emitNotify = true): void {
    if (emitNotify) {
      const msg = status === 404 ? 'Не найдено' : error.message || message;
      this.createNotification(msg);
    }
    /*const isLoginPath = url && (url.includes('/api/authenticate'));
    const isUnauthorized = status === 401 && !isLoginPath;
    const hasNoRights = status === 403 && url.endsWith('/api/secured/client/current');
    if (hasNoRights) {
      this.router.navigate(['/api/logout']);
    } else if (isUnauthorized) {
      const loginPath = new URL(this.getCabinetUrl(url));
      const targetPath = new URL(location.href);
      targetPath.searchParams.append('redir', '1');
      loginPath.searchParams.append('target', targetPath.href);
      location.replace(loginPath.href);
    }*/
  }

  private createNotification(msg: string): void {
    this.toastr.error(msg || 'Ошибка', undefined, {
      timeOut: 5000,
      progressBar: true,
    });
  }

}
