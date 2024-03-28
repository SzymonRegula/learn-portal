import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from '../button/button.component';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { UserService } from '../../user/services/user.service';
import { AuthService } from '../../auth/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent,
    FontAwesomeModule,
    LoadingSpinnerComponent,
    RouterLink,
  ],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.scss',
})
export class ChangePasswordFormComponent {
  eyeIcon = faEyeSlash;
  hidePassword = { current: true, new: true, confirm: true };
  isLoading = false;

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    if (form.value.newPassword !== form.value.confirmPassword) {
      this.toastr.error('New password and confirm password do not match.');
      return;
    }

    const data = {
      currentPassword: form.value.currentPassword,
      newPassword: form.value.newPassword,
    };

    this.isLoading = true;
    this.userService.changePassword(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success(
          'Please log in with your new password.',
          'Password changed successfully!'
        );
        this.authService.logout();
      },
      error: (error) => {
        this.isLoading = false;
        this.toastr.error('Failed to change password.');
        console.error('Failed to change password:', error);
      },
    });
  }
}
