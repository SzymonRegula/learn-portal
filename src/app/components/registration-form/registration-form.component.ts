import { Component, Input, OnInit, inject } from '@angular/core';
import { Role } from '../../models/role.model';
import { ButtonComponent } from '../button/button.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    CommonModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent implements OnInit {
  @Input() role: Role = 'student';
  private router = inject(Router);
  isLoading = false;
  imageSrc = 'assets/registration-student.jpeg';

  ngOnInit(): void {
    if (this.role === 'trainer') {
      this.imageSrc = 'assets/registration-trainer.jpg';
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      console.log(form.value);
      this.router.navigate(['/registration-verification']);
    }, 1000);
  }
}
