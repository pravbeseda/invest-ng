import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from "./modules/navbar/navbar.module";
import { TextInputComponent } from './components/text-input/text-input.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {NgSelectModule} from '@ng-select/ng-select';
import {BindQueryParamsService} from './services/bind-query-params.service';
import {ModalModule} from './modules/modal/modal.module';
import { ModalWrapperComponent } from './components/modal-wrapper/modal-wrapper.component';

const SHARED_MODULES = [ CommonModule, ModalModule, NavbarModule, ReactiveFormsModule, HttpClientModule, NgSelectModule ];
const SHARED_COMPONENTS = [ TextInputComponent, ModalWrapperComponent ];

@NgModule({
  exports: [ ...SHARED_MODULES, ...SHARED_COMPONENTS ],
  imports: [ ...SHARED_MODULES ],
  declarations: [ ...SHARED_COMPONENTS ],
  providers: [ BindQueryParamsService ]
})
export class SharedModule { }
