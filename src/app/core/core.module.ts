import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorsInterceptor } from "./interceptors/http-errors.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {HttpAuthInterceptor} from './interceptors/http-auth.interceptor';
import {BaseUrlInterceptor} from './interceptors/http-base.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true },
  ]
})
export class CoreModule { }
