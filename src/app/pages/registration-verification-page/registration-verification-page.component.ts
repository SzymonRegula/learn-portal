import { Component, OnDestroy, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterLink } from '@angular/router';
import { CredentialsService } from '../../services/credentials.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-registration-verification-page',
  standalone: true,
  imports: [FontAwesomeModule, ButtonComponent, RouterLink, AsyncPipe],
  templateUrl: './registration-verification-page.component.html',
  styleUrl: './registration-verification-page.component.scss',
})
export class RegistrationVerificationPageComponent implements OnDestroy {
  private credentialsService = inject(CredentialsService);
  credentials$ = this.credentialsService.credentials$;
  checkIcon = faCheck;

  ngOnDestroy(): void {
    this.credentialsService.deleteCredentials();
  }
}
