import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../user/services/user.service';
import { Router } from '@angular/router';

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

  private userService = inject(UserService);
  private router = inject(Router);

  login(loginData: LoginData) {
    // TODO: Send login request to backend

    this.userService.getUser(loginData.username);
    this.isAuthorized$$.next(true);
  }

  logout() {
    this.isAuthorized$$.next(false);
    this.router.navigate(['/login']);
  }
}
