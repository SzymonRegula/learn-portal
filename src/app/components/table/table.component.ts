import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';
import { TrainingsService } from '../../services/trainings.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

type TrainingData = {
  date: Date;
  trainingName: string;
  type: string;
  studentName: string;
  trainerName: string;
  duration: string;
};

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, CustomDatePipe, CapitalizeFirstPipe, AsyncPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  tokenPayload$ = inject(AuthService).tokenPayload$;
  trainings$ = inject(TrainingsService).searchTrainings$.pipe(
    map((trainings) =>
      trainings.map(
        (training): TrainingData => ({
          date: new Date(training.date),
          trainingName: training.name,
          type: training.type.trainingType,
          studentName: training.studentName,
          trainerName: training.trainerName,
          duration: `${training.duration} d`,
        })
      )
    )
  );

  studentView = true;
  displayedColumns: string[] = [
    'date',
    'trainingName',
    'type',
    'name',
    'duration',
  ];
}
