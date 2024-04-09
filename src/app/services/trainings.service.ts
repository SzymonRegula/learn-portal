import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, map, switchMap, tap } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/services/auth.service';

export type Training = {
  id: number;
  name: string;
  studentId: string;
  studentName: string;
  trainerId: string;
  trainerName: string;
  duration: number;
  specialization: string;
  date: string;
  description: string;
  type: {
    id: string;
    trainingType: string;
  };
};

export type SearchParams = {
  studentName?: string;
  trainerName?: string;
  specialization?: string;
  from?: string;
  to?: string;
};

export type TrainingType = {
  id: string;
  trainingType: string;
};

@Injectable({
  providedIn: 'root',
})
export class TrainingsService {
  private searchTrainings$$ = new BehaviorSubject<Training[]>([]);
  searchTrainings$ = this.searchTrainings$$.asObservable();
  private trainingTypes$$ = new BehaviorSubject<TrainingType[]>([]);
  trainingTypes$ = this.trainingTypes$$.asObservable();

  private http = inject(HttpClient);
  private errorService = inject(ErrorHandlingService);
  private authService = inject(AuthService);

  getTrainings(params?: SearchParams) {
    return this.authService.tokenPayload$.pipe(
      map((payload) => ({
        [payload?.role + 'Id']: payload?.roleId,
        ...params,
      })),
      switchMap((params) =>
        this.http
          .get<Training[]>(
            `${environment.trainingServiceUrl}/trainings/search`,
            { params }
          )
          .pipe(
            tap((trainings) => {
              this.searchTrainings$$.next(trainings);
            }),
            catchError(this.errorService.handleError)
          )
      )
    );
  }

  getTrainingTypes() {
    return this.http
      .get<TrainingType[]>(`${environment.trainingServiceUrl}/trainings/types`)
      .pipe(
        tap((types) => {
          this.trainingTypes$$.next(types);
        }),
        catchError(this.errorService.handleError)
      );
  }

  addTraining(training: Omit<Training, 'id'>) {
    return this.http
      .post(`${environment.trainingServiceUrl}/trainings`, training)
      .pipe(catchError(this.errorService.handleError));
  }
}
