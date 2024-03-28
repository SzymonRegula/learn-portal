import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, switchMap, tap } from 'rxjs';
import { UserService } from '../../user/services/user.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { ErrorHandlingService } from '../../services/error-handling.service';

type LoginData = {
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private errorService: ErrorHandlingService
  ) {
    const token = this.sessionStorageService.getToken();
    if (token) {
      const decodedJwt = jwtDecode<JwtPayload>(token);

      if (decodedJwt.exp! * 1000 < Date.now()) {
        this.sessionStorageService.removeToken();
        this.isAuthorized$$.next(false);
        return;
      }

      this.isAuthorized$$.next(true);

      if (this.isAuthorized$$.value) {
        this.userService.getUser().subscribe();
      }
    }
  }

  login(loginData: LoginData) {
    return this.http
      .post<string>(`${environment.apiUrl}/auth/login`, loginData)
      .pipe(
        tap((token) => {
          this.sessionStorageService.saveToken(token);
          this.isAuthorized$$.next(true);
        }),
        switchMap(() => this.userService.getUser()),
        catchError(this.errorService.handleError)
      );
  }

  logout() {
    this.sessionStorageService.removeToken();
    this.isAuthorized$$.next(false);
    this.router.navigate(['/login']);
  }
}
