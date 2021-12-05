import {Component, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

// Based on https://tailwindui.com/preview#component-70a9bdf83ef2c8568c5cddf6c39c2331

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Output() readonly logout = new EventEmitter<void>();

  dropdownMenu = false;
  userMenu = false;
}
