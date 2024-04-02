import { Component, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { MiniProfileComponent } from '../mini-profile/mini-profile.component';
import { OutsideClickDirective } from '../../directives/outside-click.directive';
import { AuthService } from '../../auth/services/auth.service';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../../user/services/user.service';
import { PATHS } from '../../paths';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NavigationComponent,
    ButtonComponent,
    LogoComponent,
    MiniProfileComponent,
    OutsideClickDirective,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  loginPath = '/' + PATHS.login;
  joinUsPath = '/' + PATHS.joinUs;
  isAuthorized$ = inject(AuthService).isAuthorized$;
  user$ = inject(UserService).user$;

  miniProfileOpen = false;

  toggleMiniProfile() {
    this.miniProfileOpen = !this.miniProfileOpen;
  }
}
