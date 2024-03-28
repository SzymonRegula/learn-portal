import { Component } from '@angular/core';
import { ChangePasswordFormComponent } from '../../components/change-password-form/change-password-form.component';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-change-password-page',
  standalone: true,
  imports: [ChangePasswordFormComponent, FontAwesomeModule],
  templateUrl: './change-password-page.component.html',
  styleUrl: './change-password-page.component.scss',
})
export class ChangePasswordPageComponent {
  lockIcon = faLock;
}
