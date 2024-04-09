import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ErrorHandlingService } from './error-handling.service';
import { UserService } from '../user/services/user.service';

export type Trainer = {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
};

@Injectable({
  providedIn: 'root',
})
export class TrainersService {
  private activeTrainers$$ = new BehaviorSubject<Trainer[]>([]);
  activeTrainers$ = this.activeTrainers$$.asObservable();

  private http = inject(HttpClient);
  private errorService = inject(ErrorHandlingService);
  private userService = inject(UserService);

  getActiveTrainers() {
    return this.http
      .get<Trainer[]>(`${environment.userServiceUrl}/users/trainers`)
      .pipe(
        tap((trainers) => this.activeTrainers$$.next(trainers)),
        catchError(this.errorService.handleError)
      );
  }

  myTrainers$ = combineLatest([
    this.userService.user$,
    this.activeTrainers$,
  ]).pipe(
    map(([user, activeTrainers]) =>
      user?.role === 'student'
        ? activeTrainers.filter((trainer) =>
            user.trainerIds?.includes(trainer.id)
          )
        : []
    )
  );

  notMyTrainers$ = combineLatest([
    this.userService.user$,
    this.activeTrainers$,
  ]).pipe(
    map(([user, activeTrainers]) =>
      user?.role === 'student'
        ? activeTrainers.filter(
            (trainer) => !user.trainerIds?.includes(trainer.id)
          )
        : activeTrainers
    )
  );
}
