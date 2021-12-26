import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarMenuItemComponent } from './components/navbar-menu-item/navbar-menu-item.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [ NavbarComponent, NavbarMenuItemComponent ],
  exports: [ NavbarComponent ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class NavbarModule { }
