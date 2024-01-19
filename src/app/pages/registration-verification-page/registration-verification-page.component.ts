import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration-verification-page',
  standalone: true,
  imports: [FontAwesomeModule, ButtonComponent, RouterLink],
  templateUrl: './registration-verification-page.component.html',
  styleUrl: './registration-verification-page.component.scss',
})
export class RegistrationVerificationPageComponent {
  checkIcon = faCheck;
  username = 'John Doe';
  password = '12345678';
}
