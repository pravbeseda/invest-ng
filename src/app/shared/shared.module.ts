import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from "./navbar/navbar.module";
import { ModalComponent } from './components/modal/modal.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

const SHARED_MODULES = [ CommonModule, NavbarModule, ReactiveFormsModule, HttpClientModule ];
const SHARED_COMPONENTS = [ ModalComponent, TextInputComponent ];

@NgModule({
  exports: [ ...SHARED_MODULES, ...SHARED_COMPONENTS ],
  imports: [ ...SHARED_MODULES ],
  declarations: [ ...SHARED_COMPONENTS ]
})
export class SharedModule { }
