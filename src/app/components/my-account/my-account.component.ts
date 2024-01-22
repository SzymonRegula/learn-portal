import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
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

interface ProfileData {
  image: string;
  status: 'active' | 'inactive';
  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth?: Date;
  adress?: string;
  email: string;
}

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CapitalizeFirstPipe,
    CustomDatePipe,
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
export class MyAccountComponent {
  customDateService = inject(CustomDateService);
  modal = inject(MatDialog);
  activeIcon = faCircleCheck;
  inactiveIcon = faCircleXmark;

  // TODO: Add logic to get user data from API
  data: ProfileData = {
    image: 'assets/avatar-john.jpg',
    status: 'active',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    dateOfBirth: new Date('1990-01-01'),
    adress: '123 Main St, New York, NY 10030',
    email: 'john@gamil.com',
  };
  editMode = false;

  profileForm: FormGroup = new FormGroup({
    image: new FormControl(this.data.image),
    status: new FormControl(this.data.status, Validators.required),
    firstName: new FormControl(this.data.firstName, Validators.required),
    lastName: new FormControl(this.data.lastName, Validators.required),
    username: new FormControl(this.data.username, Validators.required),
    dateOfBirth: new FormControl(
      this.data.dateOfBirth
        ? this.customDateService.ddmmyyyy(this.data.dateOfBirth)
        : ''
    ),
    adress: new FormControl(this.data.adress),
    email: new FormControl(this.data.email, Validators.required),
  });

  onSaveChanges() {
    console.log(this.profileForm);
  }

  changeModeHandler() {
    this.editMode = !this.editMode;
  }

  changePasswordHandler() {
    console.log('changePasswordHandler');
  }

  chooseImageHandler(event: Event) {
    this.modal.open(ModalBoxComponent, {
      data: { title: 'Upload files' },
    });
  }

  removeImageHandler(event: Event) {
    console.log('removeImageHandler');
  }
}
