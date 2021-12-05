import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './shared/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'invest';

  constructor( private authenticationService: AuthenticationService, private router: Router ) {}

  ngOnInit() {
    if (this.authenticationService.isLogged()) {
      this.authenticationService.updateCurrentUser().subscribe();
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/user/login');
  }
}
