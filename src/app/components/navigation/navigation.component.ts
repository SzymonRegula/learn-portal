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
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  isAuthorized$ = this.authService.isAuthorized$;
  burgerMenuIcon = faEllipsis;
  closeMenuIcon = faXmark;
  logoutIcon = faArrowRightFromBracket;
  menuOpen = false;

  // TODO: Replace with user data from API
  username = 'John_12';
  email = 'John_12@gmail.com';

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // TODO: Implement logout functionality
  onLogout() {
    this.authService.logout();
    this.toastr.info('Logged out!');
  }
}
