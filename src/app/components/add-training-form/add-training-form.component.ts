import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import {
  Training,
  TrainingType,
  TrainingsService,
} from '../../services/trainings.service';
import { Trainer, TrainersService } from '../../services/trainers.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { User, UserService } from '../../user/services/user.service';
@Component({
  selector: 'app-add-training-form',
  standalone: true,
  imports: [
    ButtonComponent,
    DatePickerComponent,
    AsyncPipe,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './add-training-form.component.html',
  styleUrl: './add-training-form.component.scss',
})
export class AddTrainingFormComponent {
  @Output() cancel = new EventEmitter<void>();

  private trainingService = inject(TrainingsService);
  private trainersService = inject(TrainersService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  user$ = inject(UserService).user$;
  user: User | null = null;
  trainers$ = this.trainersService.myTrainers$;
  trainingTypes$ = this.trainingService.trainingTypes$;

  form = this.fb.group({
    name: ['', Validators.required],
    date: ['', Validators.required],
    duration: ['', Validators.required],
    description: [''],
    type: ['', Validators.required],
    trainer: ['', Validators.required],
  });

  onAddTraining() {
    if (this.form.invalid) {
      const invalidControls = Object.keys(this.form.controls).filter(
        (control) => this.form.get(control)?.invalid
      );

      this.toastr.info(
        invalidControls.join(', '),
        `Please fill in the following fields:`
      );
      return;
    }

    this.user$.pipe(first()).subscribe((user) => (this.user = user));

    const trainer = JSON.parse(this.form.get('trainer')?.value!) as Trainer;
    const type = JSON.parse(this.form.get('type')?.value!) as TrainingType;

    const newTraining: Omit<Training, 'id'> = {
      studentId: this.user?.roleId!,
      studentName: `${this.user?.firstName} ${this.user?.lastName}`,
      trainerId: trainer.id,
      trainerName: `${trainer.firstName} ${trainer.lastName}`,
      specialization: trainer.specialization,
      date: this.form.value.date!,
      name: this.form.value.name!,
      type,
      duration: Number(this.form.value.duration),
      description: this.form.value.description || '',
    };

    this.trainingService.addTraining(newTraining).subscribe({
      next: () => {
        this.toastr.success('Training added successfully');
      },
      error: (error) => {
        this.toastr.error(error.message);
        console.error(error);
      },
    });
  }

  onDateChange(date: Date) {
    this.form.get('date')?.setValue(date.toISOString());
  }

  onCancel() {
    this.cancel.emit();
  }
}
