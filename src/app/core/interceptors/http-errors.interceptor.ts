import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import { isObject } from 'lodash';
import {distinctUntilChanged, tap} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {Router} from '@angular/router';

@Injectable()
export class HttpErrorsInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

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
    const isUnauthorized = status === 401;
    if (isUnauthorized) {
      this.router.navigate(['/user/login'], {state: { redirect: this.router.url }});
    }
  }

  private createNotification(msg: string): void {
    this.toastr.error(msg || 'Ошибка', undefined, {
      timeOut: 5000,
      progressBar: true,
    });
  }

}
