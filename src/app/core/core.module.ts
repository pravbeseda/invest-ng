import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorsInterceptor } from "./interceptors/http-errors.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true },]
})
export class CoreModule { }
