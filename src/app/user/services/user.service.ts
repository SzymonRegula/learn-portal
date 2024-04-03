import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role } from '../../models/role.model';
import { ErrorHandlingService } from '../../services/error-handling.service';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  isActive: boolean;
  role: Role;
  roleId: string;
  photo: string;

  address?: string;
  dateOfBirth?: string;
  trainerIds?: string[];

  specializationId?: string;
  specialization?: string;
  studentIds?: string[];
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<User | null>(null);
  user$ = this.user$$.asObservable();

  private http = inject(HttpClient);
  private errorService = inject(ErrorHandlingService);

  getUser() {
    return this.http.get<User>(`${environment.userServiceUrl}/users/me`).pipe(
      tap((user) => {
        this.user$$.next(user);
      }),
      catchError(this.errorService.handleError)
    );
  }

  registerUser(data: unknown) {
    return this.http
      .post(`${environment.userServiceUrl}/auth/register`, data)
      .pipe(catchError(this.errorService.handleError));
  }

  deleteUser() {
    return this.http.delete(`${environment.userServiceUrl}/users/me`).pipe(
      tap(() => {
        this.user$$.next(null);
      }),
      catchError(this.errorService.handleError)
    );
  }

  updateUser(data: unknown) {
    return this.http.patch(`${environment.userServiceUrl}/users/me`, data).pipe(
      tap((updatedData) => {
        const updatedUser = { ...this.user$$.value, ...updatedData } as User;
        return this.user$$.next(updatedUser);
      }),
      catchError(this.errorService.handleError)
    );
  }

  changePassword(data: { currentPassword: string; newPassword: string }) {
    return this.http
      .put(`${environment.userServiceUrl}/users/update-password`, data)
      .pipe(catchError(this.errorService.handleError));
  }

  addTrainer(trainerId: string) {
    return this.http
      .post(`${environment.userServiceUrl}/users/trainers`, { trainerId })
      .pipe(catchError(this.errorService.handleError));
  }
}
