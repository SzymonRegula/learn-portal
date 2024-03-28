import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { faMoon, faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user/services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-mini-profile',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, MatSlideToggleModule, AsyncPipe],
  templateUrl: './mini-profile.component.html',
  styleUrl: './mini-profile.component.scss',
})
export class MiniProfileComponent {
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  user$ = inject(UserService).user$;

  logoutIcon = faArrowRightFromBracket;
  moonIcon = faMoon;
  accountIcon = faCircleUser;

  onLogout() {
    this.authService.logout();
    this.toastr.info('Logged out!');
  }
}
