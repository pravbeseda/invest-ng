import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from "./navbar/navbar.module";

const SHARED_MODULES = [ NavbarModule ]

@NgModule({
  exports:  [ ...SHARED_MODULES ],
  imports: [
    CommonModule,
    ...SHARED_MODULES
  ]
})
export class SharedModule { }
