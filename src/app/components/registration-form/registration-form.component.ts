import { Component, Input, OnInit, inject } from '@angular/core';
import { Role } from '../../models/role.model';
import { ButtonComponent } from '../button/button.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';
import { SpecializationsService } from '../../services/specializations.service';
import { UserService } from '../../user/services/user.service';
import { CustomDateService } from '../../services/custom-date.service';
import { DdmmyyyyValidatorDirective } from '../../directives/ddmmyyyy-validator.directive';
import { AuthService } from '../../auth/services/auth.service';
import { switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CredentialsService } from '../../services/credentials.service';

type BaseData = {
  firstName: string;
  lastName: string;
  email: string;
};

type TrainerData = BaseData & {
  specializationId: string;
};

type StudentData = BaseData & {
  dateOfBirth?: string;
  address?: string;
};

type TrainerRequestData = TrainerData & {
  username: string;
  password: string;
  role: 'trainer';
};

type StudentRequestData = StudentData & {
  username: string;
  password: string;
  role: 'student';
};

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    CommonModule,
    LoadingSpinnerComponent,
    DdmmyyyyValidatorDirective,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent implements OnInit {
  @Input() role: Role = 'student';
  private router = inject(Router);
  private specializationsService = inject(SpecializationsService);
  private userService = inject(UserService);
  private customDateService = inject(CustomDateService);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private credentialsService = inject(CredentialsService);
  specializations$ = this.specializationsService.specializations$;
  isLoading = false;
  imageSrc = 'assets/registration-student.jpeg';

  ngOnInit(): void {
    if (this.role === 'trainer') {
      this.imageSrc = 'assets/registration-trainer.jpg';
      this.specializationsService.getSpecializations().subscribe();
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    let data: TrainerRequestData | StudentRequestData;

    this.role === 'trainer'
      ? (data = this.getTrainerRegistrationData(form.value))
      : (data = this.getStudentRegistrationData(form.value));

    this.isLoading = true;
    this.userService
      .registerUser(data)
      .pipe(
        switchMap(() =>
          this.authService.login({
            username: data.username,
            password: data.password,
          })
        )
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.credentialsService.saveCredentials({
            username: data.username,
            password: data.password,
          });
          this.router.navigate(['/registration-verification']);
        },
        error: (error) => {
          this.isLoading = false;
          this.toastr.error(error.message);
          console.error(error);
        },
      });
  }

  private generatePassword(): string {
    return Math.random().toString(36).slice(-8);
  }

  private generateUsername(firstName: string, lastName: string): string {
    return (
      firstName.toLowerCase() +
      lastName.toLowerCase() +
      Math.floor(Math.random() * 100)
    );
  }

  private getBaseRegistrationData(formValues: BaseData) {
    return {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      username: this.generateUsername(
        formValues.firstName,
        formValues.lastName
      ),
      email: formValues.email,
      password: this.generatePassword(),
    };
  }

  private getTrainerRegistrationData(
    formValues: TrainerData
  ): TrainerRequestData {
    return {
      ...this.getBaseRegistrationData(formValues),
      role: 'trainer',
      specializationId: formValues.specializationId,
    };
  }

  private getStudentRegistrationData(
    formValues: StudentData
  ): StudentRequestData {
    let date: string = '';
    if (formValues.dateOfBirth) {
      date = this.customDateService.ddmmyyyyToISO(formValues.dateOfBirth);
    }

    return {
      ...this.getBaseRegistrationData(formValues),
      role: 'student',
      dateOfBirth: date,
      address: formValues.address,
    };
  }
}
