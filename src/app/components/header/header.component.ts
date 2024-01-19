import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { MiniProfileComponent } from '../mini-profile/mini-profile.component';
import { OutsideClickDirective } from '../../directives/outside-click.directive';

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // TODO: Add logic to check if user is logged in
  logged = true;
  miniProfileOpen = false;
  user = {
    username: 'Jihn_12',
    imageSrc: 'assets/avatar-john.jpg',
  };

  toggleMiniProfile() {
    this.miniProfileOpen = !this.miniProfileOpen;
  }
}
