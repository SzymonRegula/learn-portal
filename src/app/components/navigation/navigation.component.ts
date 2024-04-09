import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEllipsis,
  faXmark,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { OutsideClickDirective } from '../../directives/outside-click.directive';
import { UserService } from '../../user/services/user.service';
import { PATHS } from '../../paths';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    LogoComponent,
    AsyncPipe,
    ButtonComponent,
    OutsideClickDirective,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  blogPath = '/' + PATHS.blog;
  pricingPath = '/' + PATHS.pricing;
  aboutUsPath = '/' + PATHS.aboutUs;
  myAccountPath = '/' + PATHS.myAccount;
  loginPath = '/' + PATHS.login;
  joinUsPath = '/' + PATHS.joinUs;

  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  user$ = inject(UserService).user$;
  isAuthorized$ = this.authService.isAuthorized$;
  burgerMenuIcon = faEllipsis;
  closeMenuIcon = faXmark;
  logoutIcon = faArrowRightFromBracket;
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onLogout() {
    this.authService.logout();
    this.toastr.info('Logged out!');
  }
}
