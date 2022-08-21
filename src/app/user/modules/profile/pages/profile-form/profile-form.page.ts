import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {AuthenticationService} from '../../../../../shared/services/authentication.service';
import {ProfileService} from '../../services/profile.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.page.html',
  styleUrls: ['./profile-form.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormPage implements OnInit {

  readonly form = this.fb.group({
    username: null,
    email: null,
  });

  constructor(
    private fb: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentUser = this.authenticationService.currentUser$.value;
    if (!!currentUser) {
      this.form.patchValue(currentUser);
    }
  }

  save(): void {
    this.profileService.updateUser(this.form.value).subscribe(() => {
      this.toastr.success('Изменения внесены!');
      this.authenticationService.updateCurrentUser().subscribe();
      this.router.navigateByUrl('/');
    });
  }

}
