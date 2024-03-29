import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ErrorHandlingService } from './error-handling.service';

type Specialization = {
  id: string;
  specialization: string;
};

@Injectable({
  providedIn: 'root',
})
export class SpecializationsService {
  private specializations$$ = new BehaviorSubject<Specialization[]>([]);
  specializations$ = this.specializations$$.asObservable();

  private http = inject(HttpClient);
  private errorService = inject(ErrorHandlingService);

  getSpecializations() {
    return this.http
      .get<Specialization[]>(
        `${environment.apiUrl}/users/trainers/specializations`
      )
      .pipe(
        tap((specializations) => this.specializations$$.next(specializations)),
        catchError(this.errorService.handleError)
      );
  }
}
