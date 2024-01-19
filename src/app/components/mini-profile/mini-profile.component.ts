import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { faMoon, faCircleUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-mini-profile',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, MatSlideToggleModule],
  templateUrl: './mini-profile.component.html',
  styleUrl: './mini-profile.component.scss',
})
export class MiniProfileComponent {
  logoutIcon = faArrowRightFromBracket;
  moonIcon = faMoon;
  accountIcon = faCircleUser;

  user = {
    imageSrc: 'assets/avatar-john.jpg',
    username: 'Jihn_12',
    email: 'john@gmail.com',
  };

  onLogout() {
    console.log('Logout');
  }
}
