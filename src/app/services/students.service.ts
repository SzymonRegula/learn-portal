import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ErrorHandlingService } from './error-handling.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, tap } from 'rxjs';

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private myStudents$$ = new BehaviorSubject<Student[]>([]);
  myStudents$ = this.myStudents$$.asObservable();

  private http = inject(HttpClient);
  private errorService = inject(ErrorHandlingService);

  getMyStudents() {
    return this.http
      .get<Student[]>(`${environment.userServiceUrl}/users/students`)
      .pipe(
        tap((students) => this.myStudents$$.next(students)),
        catchError(this.errorService.handleError)
      );
  }
}
