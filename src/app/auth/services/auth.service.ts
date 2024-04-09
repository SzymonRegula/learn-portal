import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, switchMap, tap } from 'rxjs';
import { UserService } from '../../user/services/user.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { Role } from '../../models/role.model';

type LoginData = {
  username: string;
  password: string;
};

type TokenPayload = {
  userId: string;
  role: Role;
  roleId: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  isAuthorized$ = this.isAuthorized$$.asObservable();
  private tokenPayload$$ = new BehaviorSubject<TokenPayload | null>(null);
  tokenPayload$ = this.tokenPayload$$.asObservable();

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private errorService: ErrorHandlingService
  ) {
    const token = this.sessionStorageService.getToken();
    if (token) {
      const decodedJwt = jwtDecode<JwtPayload & TokenPayload>(token);

      if (decodedJwt.exp! * 1000 < Date.now()) {
        this.sessionStorageService.removeToken();
        return;
      }

      this.setState(decodedJwt);

      this.userService.getUser().subscribe();
    }
  }

  login(loginData: LoginData) {
    return this.http
      .post<string>(`${environment.userServiceUrl}/auth/login`, loginData)
      .pipe(
        tap((token) => {
          this.sessionStorageService.saveToken(token);
          const decodedJwt = jwtDecode<JwtPayload & TokenPayload>(token);
          this.setState(decodedJwt);
        }),
        switchMap(() => this.userService.getUser()),
        catchError(this.errorService.handleError)
      );
  }

  logout() {
    this.sessionStorageService.removeToken();
    this.setState(null);
    this.router.navigate(['/']);
  }

  private setState(token: (JwtPayload & TokenPayload) | null) {
    if (token) {
      this.tokenPayload$$.next({
        userId: token.userId,
        role: token.role,
        roleId: token.roleId,
      });
      this.isAuthorized$$.next(true);
    } else {
      this.tokenPayload$$.next(null);
      this.isAuthorized$$.next(false);
    }
  }
}
