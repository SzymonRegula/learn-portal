import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

export const studentGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.tokenPayload$.pipe(
    map((payload) => {
      if (payload === null) {
        return router.parseUrl('/login');
      }
      if (payload.role !== 'student') {
        return router.parseUrl('/');
      }
      return true;
    })
  );
};
