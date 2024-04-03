import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TrainersService } from '../../services/trainers.service';
import { ButtonComponent } from '../button/button.component';
import { AsyncPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription, first, forkJoin, switchMap, tap } from 'rxjs';
import { UserService } from '../../user/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-trainers',
  standalone: true,
  imports: [
    ButtonComponent,
    AsyncPipe,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './all-trainers.component.html',
  styleUrl: './all-trainers.component.scss',
})
export class AllTrainersComponent implements OnInit, OnDestroy {
  private trainersService = inject(TrainersService);
  private userService = inject(UserService);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);

  private subscription!: Subscription;
  form!: FormGroup;
  notMyTrainers$ = this.trainersService.notMyTrainers$;

  ngOnInit(): void {
    this.subscription = this.notMyTrainers$.subscribe((trainers) => {
      const form: { [key: string]: FormControl } = {};
      trainers.forEach((trainer) => {
        form[trainer.id] = this.fb.control(false);
      });
      this.form = this.fb.group(form);
    });
  }

  addTrainersHandler(): void {
    const formValue = this.form.value;
    const trainerIds = Object.keys(formValue).filter(
      (trainerId) => formValue[trainerId]
    );

    if (trainerIds.length === 0) {
      this.toastr.warning('Select at least one trainer!');
      return;
    }

    const addTrainersObservable$ = trainerIds.map((trainerId) =>
      this.userService.addTrainer(trainerId)
    );

    forkJoin(addTrainersObservable$)
      .pipe(
        first(),
        tap(() => this.toastr.success('Added successfully!')),
        switchMap(() => this.userService.getUser())
      )
      .subscribe({
        error: (error) => this.toastr.error(error),
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
