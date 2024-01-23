import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authorizedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthorized$.pipe(
    map((isAuthorized) => (isAuthorized ? true : router.parseUrl('/login')))
  );
};
