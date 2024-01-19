import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEllipsis,
  faXmark,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { LogoComponent } from '../logo/logo.component';
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, LogoComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
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
    console.log('Logout');
  }
}
