import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from "./navbar/navbar.module";
import { ModalComponent } from './components/modal/modal.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {NgSelectModule} from '@ng-select/ng-select';
import {BindQueryParamsService} from './services/bind-query-params.service';
import {FileUploaderDirective} from './directives/file-uploader.directive';

const SHARED_MODULES = [ CommonModule, NavbarModule, ReactiveFormsModule, HttpClientModule, NgSelectModule ];
const SHARED_COMPONENTS = [ ModalComponent, TextInputComponent, FileUploaderDirective ];

@NgModule({
  exports: [ ...SHARED_MODULES, ...SHARED_COMPONENTS ],
  imports: [ ...SHARED_MODULES ],
  declarations: [ ...SHARED_COMPONENTS ],
  providers: [ BindQueryParamsService ]
})
export class SharedModule { }
