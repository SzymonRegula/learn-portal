import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';
import { faUser, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../../../environments/environment';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ToastrService } from 'ngx-toastr';

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

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // TODO: Validate captcha with backend

    // Simulate a server call
    setTimeout(() => {
      console.log(form.value);
      this.isLoading = false;

      this.toastr.success('Logged in successfully!');
    }, 1000);
  }

  resolved(captchaResponse: string | null) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captchaResponse = captchaResponse;
  }
}
