import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import { ButtonComponent } from '../button/button.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CustomDateService } from '../../services/custom-date.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalBoxComponent } from '../modal-box/modal-box.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { filter, first } from 'rxjs';
import { SpecializationsService } from '../../services/specializations.service';
import { AuthService } from '../../auth/services/auth.service';
import { PATHS } from '../../paths';

type UpdateData = {
  [key: string]: unknown;
  photo?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  dateOfBirth?: string;
  address?: string;
  email?: string;
  isActive?: boolean;
  specializationId?: string;
};

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CapitalizeFirstPipe,
    ReactiveFormsModule,
    CommonModule,
    ButtonComponent,
    MatSlideToggleModule,
    ModalBoxComponent,
    RouterLink,
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyAccountComponent implements OnInit {
  changePasswordPath = '/' + PATHS.changePassword;

  private fb = inject(FormBuilder);
  private customDateService = inject(CustomDateService);
  private modal = inject(MatDialog);
  private userService = inject(UserService);
  private specializationsService = inject(SpecializationsService);
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);

  user$ = this.userService.user$;
  specializations$ = this.specializationsService.specializations$;
  editMode = false;

  activeIcon = faCircleCheck;
  inactiveIcon = faCircleXmark;

  profileForm = this.fb.group({
    photo: [''],
    firstName: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
    ],
    username: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
    ],
    email: ['', [Validators.required, Validators.email]],
    isActive: [true, [Validators.required]],
    dateOfBirth: ['', [this.customDateService.ddmmyyyyValidator()]],
    address: [''],
    specializationId: [''],
  });

  ngOnInit(): void {
    this.setFormValues();
  }

  private setFormValues(): void {
    this.user$
      .pipe(
        filter((user) => !!user),
        first()
      )
      .subscribe((user) => {
        if (!user) {
          return;
        }

        let customDate: string = '';
        if (user.dateOfBirth) {
          const date = new Date(user.dateOfBirth);
          customDate = this.customDateService.ddmmyyyy(date);
        }

        this.profileForm.patchValue({
          photo: user.photo,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          isActive: user.isActive,
          dateOfBirth: customDate,
          address: user.address,
          specializationId: user.specializationId,
        });
      });
  }

  private getDirtyValues(): UpdateData {
    const dirtyValues: UpdateData = {};

    Object.keys(this.profileForm.controls).forEach((name) => {
      const currentControl = this.profileForm.get(name);

      if (currentControl?.dirty) {
        dirtyValues[name] = currentControl.value;
      }
    });

    if (dirtyValues.dateOfBirth) {
      dirtyValues.dateOfBirth = this.customDateService.ddmmyyyyToISO(
        dirtyValues.dateOfBirth
      );
    }
    return dirtyValues;
  }

  saveChangesHandler() {
    if (this.profileForm.invalid) {
      this.toastr.error('Invalid data!');
      return;
    }

    const changedValues: UpdateData = this.getDirtyValues();

    if (Object.keys(changedValues).length === 0) {
      this.toastr.info('No changes detected!');
      this.changeModeHandler();
      return;
    }

    console.log(changedValues);

    this.userService.updateUser(changedValues).subscribe({
      next: () => {
        this.toastr.success('Profile updated successfully!');
        this.changeModeHandler();
      },
      error: (error) => {
        if (error.status === 400) {
          this.toastr.error(error.message);
        } else {
          this.toastr.error('An error occurred!');
        }
        console.error(error);
      },
    });
  }

  changeModeHandler() {
    this.editMode = !this.editMode;
    this.profileForm.reset();
    this.setFormValues();
  }

  deleteProfileHandler() {
    this.modal
      .open(ModalBoxComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.userService.deleteUser().subscribe({
            next: () => {
              this.toastr.success('Profile deleted successfully!');
              this.authService.logout();
            },
            error: (error) => {
              this.toastr.error('Failed to delete profile!');
              console.error(error);
            },
          });
        }
      });
  }

  chooseImageHandler() {
    console.log('chooseImageHandler');
  }

  removeImageHandler() {
    console.log('removeImageHandler');
  }

  get isActive() {
    return this.profileForm.get('isActive')?.value;
  }
}
