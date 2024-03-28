import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { Router, RouterLink } from '@angular/router';
import { faUser, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../../../environments/environment';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent,
    RouterLink,
    FontAwesomeModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  userIcon = faUser;
  lockIcon = faLock;
  eyeIcon = faEyeSlash;
  hidePassword = true;
  isLoading = false;
  siteKey = environment.recaptchaV2SiteKey;
  captchaResponse: string | null = null;

  private toastr = inject(ToastrService);
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // TODO: Validate captcha with backend

    this.authService
      .login({
        username: form.value.username,
        password: form.value.password,
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.toastr.success('Logged in successfully!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.toastr.error('Invalid credentials!');
          } else {
            this.toastr.error('An error occurred!');
          }
          this.isLoading = false;
        },
      });
  }

  resolved(captchaResponse: string | null) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captchaResponse = captchaResponse;
  }
}
