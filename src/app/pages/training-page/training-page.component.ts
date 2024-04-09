import { Component, OnInit, inject } from '@angular/core';
import {
  Breadcrumb,
  BreadcrumbsComponent,
} from '../../components/breadcrumbs/breadcrumbs.component';
import { TableComponent } from '../../components/table/table.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { PATHS } from '../../paths';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import {
  SearchParams,
  TrainingsService,
} from '../../services/trainings.service';
import { AuthService } from '../../auth/services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-training-page',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    TableComponent,
    DatePickerComponent,
    ButtonComponent,
    RouterLink,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './training-page.component.html',
  styleUrl: './training-page.component.scss',
})
export class TrainingPageComponent implements OnInit {
  addTrainingPath = '/' + PATHS.addTraining;
  breadcrumbs: Breadcrumb[] = [
    { text: 'My account', url: '/' + PATHS.myAccount },
    { text: 'Trainings', url: '/' + PATHS.trainings },
  ];
  dateFrom: Date | null = null;
  dateTo: Date | null = null;

  private trainingService = inject(TrainingsService);
  tokenPayload$ = inject(AuthService).tokenPayload$;

  ngOnInit(): void {
    this.trainingService.getTrainings().subscribe();
  }

  onSearch(form: NgForm) {
    const params: SearchParams = {};
    if (form.value.studentName) {
      params.studentName = form.value.studentName;
    }
    if (form.value.trainerName) {
      params.trainerName = form.value.trainerName;
    }
    if (form.value.specialization) {
      params.specialization = form.value.specialization;
    }
    if (this.dateFrom) {
      params.from = this.dateFrom.toISOString();
    }
    if (this.dateTo) {
      params.to = this.dateTo.toISOString();
    }

    this.trainingService.getTrainings(params).subscribe();
  }

  onDateFromChange(date: Date) {
    this.dateFrom = date;
  }

  onDateToChange(date: Date) {
    this.dateTo = date;
  }
}
