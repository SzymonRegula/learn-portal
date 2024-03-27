import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role } from '../../models/role.model';
import { TokenPayload } from '../../auth/services/auth.service';
import { ErrorHandlingService } from '../../services/error-handling.service';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  isActive: boolean;
  role: Role;
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
  private tokenPayload$$ = new BehaviorSubject<TokenPayload | null>(null);
  tokenPayload$ = this.tokenPayload$$.asObservable();

  private user$$ = new BehaviorSubject<User | null>(null);
  user$ = this.user$$.asObservable();

  private http = inject(HttpClient);
  private errorService = inject(ErrorHandlingService);

  saveTokenPayload(payload: TokenPayload): void {
    this.tokenPayload$$.next(payload);
  }

  getUser() {
    return this.http.get<User>(`${environment.apiUrl}/users/me`).pipe(
      tap((user) => {
        this.user$$.next(user);
        console.log(user);
      }),
      catchError(this.errorService.handleError)
    );
  }

  updateUser(data: unknown) {
    return this.http.patch(`${environment.apiUrl}/users/me`, data).pipe(
      tap((updatedData) => {
        console.log(updatedData);
        const updatedUser = { ...this.user$$.value, ...updatedData } as User;
        return this.user$$.next(updatedUser);
      }),
      catchError(this.errorService.handleError)
    );
  }
}
